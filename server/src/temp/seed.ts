import dotenv from "dotenv";
dotenv.config();

import { listings } from "./listing-seed-data";
import { users } from "./user-seed-data";
import { Listing, User, Booking } from "../models";
import { ListingType, UserType, BookingType } from "../lib/types";

import mongoose, { Types } from "mongoose";

const MONGO_URI = process.env.MONGO_URI!.replace(
  "<password>",
  process.env.MONGO_PASSWORD!
);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database is connected"))
  .catch((error) => {
    console.log("Error connecting to database");
    console.log(error);
  });


const loadSeedData = async (
  listings: ListingType[],
  users: UserType[],
  bookings?: BookingType[]
) => {
  try {
    for (let listing of listings) {
      const newListing = new Listing(listing);
      await newListing.save();
    }

    for (let user of users) {
      const newUser = new User(user);
      await newUser.save();
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
    await Listing.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});

    console.log("Succesfully deleted seed data from database");
    process.exit();
  } catch (error) {
    console.log("Error deleting data from database");
    console.log(error);
  }
};

if (process.argv[2] === "--import") {
  loadSeedData(listings, users);
} else if (process.argv[2] === "--delete") {
  removeSeedData();
}
