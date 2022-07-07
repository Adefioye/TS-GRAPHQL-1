import { MongoClient } from "mongodb";
import { Database } from "../lib";

if (process.env.MONGO_PASSWORD && process.env.MONGO_URI) {
  var MONGO_PASSWORD = process.env.MONGO_PASSWORD;
  var MONGO_URI = process.env.MONGO_URI.replace("<password>", MONGO_PASSWORD);
}

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(MONGO_URI);

  const dbName = "tiny-house-test";
  const db = client.db(dbName);

  return {
    listings: db.collection("test-listings"),
  };
};
