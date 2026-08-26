import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { ApolloServer } from "apollo-server-express";

import data from "./data.js";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";

dotenv.config();

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");
    let currentUser = null;

    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        currentUser = data.users.find(u => u.id === decodedToken.userId);
      } catch (e) {
        console.error("Token error:", e);
      };
    };

    return { currentUser };
  }
});

await server.start();
server.applyMiddleware({ app });

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});