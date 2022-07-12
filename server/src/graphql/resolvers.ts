// import { IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";
import { Database } from "../lib";
import { Listing } from "../lib";

export const resolvers = {
  Query: {
    listings: async (
      root: undefined,
      args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      throw new Error("Error!");
      return await db.listings.find({}).toArray();
    },
  },

  Mutation: {
    deleteListing: async (
      root: undefined,
      { id }: { id: ObjectId },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deletedListing = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deletedListing.value) {
        throw new Error("Failed to delete listing");
      }

      return deletedListing.value;
    },
  },

  Listing: {
    id: (listing: Listing) => listing._id,
  },
};
