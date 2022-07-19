import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema({
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  image: { type: String, trim: true },
  host: { type: String, trim: true },
  category: { type: String, trim: true, enum: ["APARTMENT", "HOUSE"] },
  address: { type: String, trim: true },
  country: { type: String, trim: true },
  admin: { type: String, trim: true },
  city: { type: String, trim: true },
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  bookingsIndex: Schema.Types.Mixed,
  price: Number,
  numOfGuests: Number,
});

export const Listing = mongoose.model("Listing", listingSchema);
