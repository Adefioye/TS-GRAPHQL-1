import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  token: { type: String, trim: true },
  name: { type: String, trim: true },
  avatar: { type: String, trim: true },
  contact: { type: String, trim: true },
  walletId: { type: String, trim: true },
  income: Number,
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  listings: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
});

export const User = mongoose.model("User", userSchema);
