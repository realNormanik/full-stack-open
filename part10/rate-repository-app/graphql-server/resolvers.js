import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

import data from "./data.js";

const dataPath = path.join(process.cwd(), "graphql-server", "data.js");

function saveData() {
  const jsonContent = JSON.stringify(data, null, 2);
  const jsContent = `const data = ${jsonContent};\n\nexport default data;\n`;
  fs.writeFileSync(dataPath, jsContent, "utf-8");
};

function normalizeDateString(dateStr) {
  const [date, time] = dateStr.split("T");
  const [year, month, day] = date.split("-");
  const normalizedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${time}`;
  return normalizedDate;
};

dotenv.config();

const resolvers = {
  Query: {
    repositories: (_, args) => {
      const {
        orderBy = "RATING_AVERAGE",
        orderDirection = "DESC",
        searchKeyword
      } = args;
  
      let filteredRepositories = [...data.repositories];
  
      if (searchKeyword) {
        const keyword = searchKeyword.toLowerCase();
        filteredRepositories = filteredRepositories.filter((repo) =>
          repo.fullName.toLowerCase().includes(keyword)
        );
      };
  
      if (orderBy === "RATING_AVERAGE") {
        filteredRepositories.sort((a, b) =>
          orderDirection === "ASC"
            ? a.ratingAverage - b.ratingAverage
            : b.ratingAverage - a.ratingAverage
        );
      } else if (orderBy === "CREATED_AT") {
        filteredRepositories.sort((a, b) => {
          const dateA = new Date(normalizeDateString(a.createdAt));
          const dateB = new Date(normalizeDateString(b.createdAt));
  
          return orderDirection === "ASC"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        });
      };
  
      return {
        edges: filteredRepositories.map((repo) => ({ node: repo })),
      };
    },

    repository: (_, { id }) => {
      const repository = data.repositories.find(r => r.id === id);
      if (!repository) {
        throw new Error("Repository not found");
      };
  
      return repository;
    },

    me: (_, __, context) => {
      return context.currentUser || null;
    }
  },

  User: {
    reviews: (parent) => {
      const userId = parent.id;
      const userReviews = data.reviews
        .filter((review) => review.userId === userId)
        .map((review) => ({ node: review }));

      return { edges: userReviews };
    }
  },

  Repository: {
    reviews: (parent, { first = 2, after }, context) => {
      const allReviews = data.reviews.filter(r => r.repositoryId === parent.id);
      const startIndex = after ? allReviews.findIndex(r => r.id === after) + 1 : 0;
  
      const reviewsToReturn = allReviews.slice(startIndex, startIndex + first);
      const hasNextPage = startIndex + first < allReviews.length;
      const endCursor = reviewsToReturn.length > 0 ? reviewsToReturn[reviewsToReturn.length - 1].id : null;
      const startCursor = reviewsToReturn.length > 0 ? reviewsToReturn[0].id : null;
  
      return {
        edges: reviewsToReturn.map((review) => ({
          node: review,
          cursor: review.id,
        })),
        pageInfo: {
          startCursor,
          endCursor,
          hasNextPage
        }
      };
    }
  },

  Review: {
    user: (parent) => data.users.find(u => u.id === parent.userId),
    repository: (parent) => data.repositories.find(r => r.id === parent.repositoryId)
  },

  Mutation: {
    authenticate: async (_, { credentials }) => {
      const { username, password } = credentials;
      const user = data.users.find(u => u.username === username);

      if (!user) {
        throw new Error("Incorrect credentials");
      };

      const passwordCorrect = await bcrypt.compare(password, user.password);

      if (!passwordCorrect) {
        throw new Error("Incorrect credentials");
      };

      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });

      return { accessToken };
    },

    createReview: (_, { review }, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new Error("Not authenticated");
      };

      const {
        ownerName,
        repositoryName,
        rating,
        text
      } = review;

      let repository = data.repositories.find(
        r => r.fullName.toLowerCase() === `${ownerName}/${repositoryName}`.toLowerCase()
      );

      if (!repository) {
        throw new Error(`Repository ${ownerName}/${repositoryName} not found`);
      };

      const newReview = {
        id: uuid(),
        text: text || "",
        rating,
        createdAt: new Date().toISOString(),
        userId: currentUser.id,
        repositoryId: repository.id,
      };

      data.reviews.push(newReview);

      const repoReviews = data.reviews.filter(r => r.repositoryId === repository.id);
      const reviewCount = repoReviews.length;
      const ratingAverage = Math.round(
        repoReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      );

      repository.reviewCount = reviewCount;
      repository.ratingAverage = ratingAverage;

      saveData();

      return { repositoryId: repository.id };
    },

    deleteReview: (_, { id }, context) => {
      const currentUser = context.currentUser;
    
      if (!currentUser) {
        throw new Error("Not authenticated");
      };
    
      const reviewIndex = data.reviews.findIndex(r => r.id === id);
    
      if (reviewIndex === -1) {
        throw new Error("Review not found");
      };
    
      const review = data.reviews[reviewIndex];
    
      if (review.userId !== currentUser.id) {
        throw new Error("You can only delete your own reviews");
      };
    
      data.reviews.splice(reviewIndex, 1);
      const repository = data.repositories.find(r => r.id === review.repositoryId);

      if (repository) {
        const repoReviews = data.reviews.filter(r => r.repositoryId === repository.id);
        repository.reviewCount = repoReviews.length;
        repository.ratingAverage = repoReviews.length
          ? Math.round(repoReviews.reduce((sum, r) => sum + r.rating, 0) / repoReviews.length)
          : 0;
      };
    
      saveData();
    
      return true;
    },

    createUser: async (_, { user }) => {
      const { username, password } = user;
      const existingUser = data.users.find(u => u.username === username);

      if (existingUser) {
        throw new Error("Username is already taken");
      };

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = {
        id: uuid(),
        username,
        password: passwordHash
      };

      data.users.push(newUser);
      saveData();

      return {
        id: newUser.id,
        username: newUser.username
      };
    }
  }
};

export default resolvers;