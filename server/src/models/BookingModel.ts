import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  listing: { type: Schema.Types.ObjectId, ref: "Listing" },
  tenant: { type: String, trim: true },
  checkIn: { type: String, trim: true },
  checkOut: { type: String, trim: true },
});

export const Booking = mongoose.model("Booking", bookingSchema);
