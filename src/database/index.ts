import { MongoClient } from "mongodb";
import { Database } from "../lib";

const MONGO_PASSWORD = "CPYQcNPph7MnCQoy";
const MONGO_URI =
  "mongodb+srv://tiny-house-test:<password>@cluster0.hhjll.mongodb.net/?retryWrites=true&w=majority".replace(
    "<password>",
    MONGO_PASSWORD
  );

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(MONGO_URI);

  const dbName = "tiny-house-test";
  const db = client.db(dbName);

  return {
    listings: db.collection("test-listings"),
  };
};
