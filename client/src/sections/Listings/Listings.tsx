import React from "react";
import { server } from "../../lib/api";
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariable,
} from "./types";

const FETCH_LISTINGS = `
query Listings {
    listings {
        id
        title
        image 
        address
        price 
        numOfGuests
        numOfBeds 
        numOfBaths
        rating
    }
}
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }

`;

interface Props {
  title: string;
}

export const Listing = ({ title }: Props) => {
  const fetchListing = async () => {
    const { data } = await server.fetch<ListingsData>({
      query: FETCH_LISTINGS,
    });

    console.log(data);
  };

  const deleteListing = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariable
    >({
      query: DELETE_LISTING,
      variables: {
        id: "62c7fc57f831d65567629213",
      },
    });

    console.log(data);
  };

  return (
    <div>
      <h3>{title}</h3>
      <button onClick={fetchListing}>Fetch listings</button>
      <button onClick={deleteListing}>Delete listing</button>
    </div>
  );
};
