import { Types, Collection } from "mongoose";

export interface BookingsIndexMonth {
  [key: string]: boolean;
}

export interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth;
}

export interface BookingsIndex {
  [key: string]: BookingsIndexYear;
}

export enum ListingCategory {
  Apartment = "APARTMENT",
  House = "HOUSE",
}

export interface BookingType {
  _id: Types.ObjectId;
  listing: Types.ObjectId;
  tenant: string;
  checkIn: string;
  checkOut: string;
}

export interface ListingType {
  _id: Types.ObjectId;
  title: string;
  description: string;
  image: string;
  host: string;
  category: ListingCategory;
  address: string;
  country: string;
  admin: string;
  city: string;
  bookings: Types.ObjectId[];
  bookingsIndex: BookingsIndex;
  price: number;
  numOfGuests: number;
}

export interface UserType {
  _id: Types.ObjectId;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string;
  income: number;
  bookings: Types.ObjectId[];
  listings: Types.ObjectId[];
}

export interface Database {
  bookings: Collection<BookingType>;
  listings: Collection<ListingType>;
  users: Collection<UserType>;
}
