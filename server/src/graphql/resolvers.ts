// import { IResolvers } from "apollo-server-express";
import { ObjectId, Query } from "mongoose";
import { ListingType } from "../lib/types";
import Listing from "../models/ListingModel";

export const resolvers = {
  Query: {
    listings: async (root: undefined, args: {}): Promise<ListingType[]> => {
      const listings = await Listing.find({});
      return listings;
    },
  },

  Mutation: {
    deleteListing: async (root: undefined, { id }: { id: ObjectId }) => {
      const deletedListing = await Listing.findOneAndDelete({ id });

      if (!deletedListing) {
        throw new Error("Failed to delete listing");
      }

      return deletedListing;
    },
  },

  Listing: {
    id: (listing: ListingType) => listing._id,
  },
};
