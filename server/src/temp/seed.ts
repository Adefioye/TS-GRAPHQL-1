import dotenv from "dotenv";
dotenv.config();

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

import Listing from "../models/Listing";
import { ListingType } from "../lib";

const listings: ListingType[] = [
  {
    _id: new Types.ObjectId(),
    title: "Clean and fully furnished apartment. 5 min away from CN Tower",
    image:
      "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
    address: "3210 Scotchmere Dr W, Toronto, ON, CA",
    price: 10000,
    numOfGuests: 2,
    numOfBeds: 1,
    numOfBaths: 2,
    rating: 5,
  },
  {
    _id: new Types.ObjectId(),
    title: "Luxurious home with private pool",
    image:
      "https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg",
    address: "100 Hollywood Hills Dr, Los Angeles, California",
    price: 15000,
    numOfGuests: 2,
    numOfBeds: 1,
    numOfBaths: 1,
    rating: 4,
  },
  {
    _id: new Types.ObjectId(),
    title: "Single bedroom located in the heart of downtown San Fransisco",
    image:
      "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
    address: "200 Sunnyside Rd, San Fransisco, California",
    price: 25000,
    numOfGuests: 3,
    numOfBeds: 2,
    numOfBaths: 2,
    rating: 3,
  },
];

const loadSeedData = async (listings: ListingType[]) => {
  try {
    for (let listing of listings) {
      const newListing = new Listing(listing);
      await newListing.save();
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
