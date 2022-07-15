import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import mongoose from "mongoose";
// PWD: CPYQcNPph7MnCQoy
async function startApolloServer(app: Application) {
  const PORT = 5000;

  const MONGO_URI = process.env.MONGO_URI!.replace(
    "<password>",
    process.env.MONGO_PASSWORD!
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/api" });

  await mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Database is connected"))
    .catch((error) => {
      console.log("Error connecting to Database");
      console.log(error);
    });

  app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
}

startApolloServer(express());
