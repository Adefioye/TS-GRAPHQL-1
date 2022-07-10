import dotenv from "dotenv";
dotenv.config();

import { listings } from "../listings";
import { connectDatabase } from "../database";
import { Listing } from "../lib";

const loadSeedData = async (listings: Listing[]) => {
  try {
    const db = await connectDatabase();

    for (let listing of listings) {
      await db.listings.insertOne(listing);
    }

    console.log("Succesfully loaded the database");
    process.exit();
  } catch (error) {
    console.log("Error loading the database");
    console.log(error);
  }
};

const removeSeedData = async () => {
  try {
    const db = await connectDatabase();

    await db.listings.deleteMany({});

    console.log("Succesfully deleted seed data from database");
    process.exit();
  } catch (error) {
    console.log("Error deleting data from database");
    console.log(error);
  }
};

if (process.argv[2] === "--import") {
  loadSeedData(listings);
} else if (process.argv[2] === "--delete") {
  removeSeedData();
}
