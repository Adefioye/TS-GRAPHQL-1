import React from "react";
import { server, useQuery } from "../../lib/api";
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

export const Listings = ({ title }: Props) => {
  const { data, loading, refetch } = useQuery<ListingsData>(FETCH_LISTINGS);
  const listings = data ? data.listings : null;

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariable>({
      query: DELETE_LISTING,
      variables: { id },
    });

    refetch();
  };

  const renderListing = () => {
    return (
      <ul>
        {listings &&
          listings.map((listing) => {
            return (
              <li key={listing.id}>
                {listing.title}
                <button onClick={() => deleteListing(listing.id)}>
                  Delete listing
                </button>
              </li>
            );
          })}
      </ul>
    );
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div>
      <h3>{title}</h3>
      {renderListing()}
    </div>
  );
};
