import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum AllRepositoriesOrderBy {
    RATING_AVERAGE
    CREATED_AT
  }

  enum OrderDirection {
    ASC
    DESC
  }

  type Repository {
    id: ID!
    fullName: String!
    description: String
    language: String
    forksCount: Int
    stargazersCount: Int
    ratingAverage: Int
    reviewCount: Int
    ownerAvatarUrl: String
    createdAt: String
    url: String
    reviews(first: Int, after: String): ReviewConnection!
  }

  type RepositoryEdge {
    node: Repository!
    cursor: String!
  }

  type RepositoryConnection {
    edges: [RepositoryEdge!]!
    pageInfo: PageInfo!
  }

  type Review {
    id: ID!
    text: String!
    rating: Int!
    createdAt: String!
    user: User!
    repository: Repository!
  }

  type ReviewEdge {
    node: Review!
    cursor: String!
  }

  type ReviewConnection {
    edges: [ReviewEdge!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    startCursor: String
    endCursor: String
    hasNextPage: Boolean!
  }

  type User {
    id: ID!
    username: String!
    reviews: ReviewConnection!
  }

  type Query {
    repositories(
      orderBy: AllRepositoriesOrderBy = RATING_AVERAGE
      orderDirection: OrderDirection = DESC
      searchKeyword: String
    ): RepositoryConnection!
    repository(id: ID!): Repository
    me: User
  }

  input AuthenticateInput {
    username: String!
    password: String!
  }

  type AuthenticationPayload {
    accessToken: String!
  }

  input CreateReviewInput {
    ownerName: String!
    repositoryName: String!
    rating: Int!
    text: String
  }

  type CreateReviewPayload {
    repositoryId: ID!
  }

  input CreateUserInput {
    username: String!
    password: String!
  }

  type CreateUserPayload {
    id: ID!
    username: String!
  }

  type Mutation {
    authenticate(credentials: AuthenticateInput!): AuthenticationPayload
    createReview(review: CreateReviewInput!): CreateReviewPayload
    createUser(user: CreateUserInput!): CreateUserPayload
    deleteReview(id: ID!): Boolean!
  }
`;

export default typeDefs;