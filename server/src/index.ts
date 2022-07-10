import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { connectDatabase } from "./database";
// import { typeDefs, resolvers } from "./graphql";

// PWD: CPYQcNPph7MnCQoy
async function startApolloServer(app: Application) {
  const PORT = 5000;
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api" });

  app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
}

startApolloServer(express());
