import mongoose from "mongoose";
const { Schema } = mongoose;

const listingSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title of listing must be provided"],
  },
  image: {
    type: String,
    required: [true, "Title of listing must be provided"],
  },
  address: {
    type: String,
    required: [true, "Title of listing must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Title of listing must be provided"],
  },
  numOfGuests: {
    type: Number,
    required: [true, "Title of listing must be provided"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Title of listing must be provided"],
  },
  numOfBaths: {
    type: Number,
    required: [true, "Title of listing must be provided"],
  },
  rating: {
    type: Number,
    required: [true, "Title of listing must be provided"],
    min: 1,
    max: 5,
  },
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
