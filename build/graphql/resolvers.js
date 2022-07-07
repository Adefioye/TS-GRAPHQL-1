"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
// import { IResolvers } from "apollo-server-express";
const listings_1 = require("./../listings");
exports.resolvers = {
    Query: {
        listings: () => {
            return listings_1.listings;
        },
    },
    Mutation: {
        deleteListing: (root, { id }) => {
            for (let i = 0; i < listings_1.listings.length; i++) {
                if (listings_1.listings[i].id === id) {
                    return listings_1.listings.splice(i, 1)[0];
                }
            }
            throw new Error("Failed to delete listing");
        },
    },
};
