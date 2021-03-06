import React from "react";
// import { useQuery, useMutation } from "../../lib/api";
import { useQuery, useMutation, gql } from "@apollo/client";

import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariable,
} from "./types";

const FETCH_LISTINGS = gql`
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

const DELETE_LISTING = gql`
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
  const { data, loading, error } = useQuery<ListingsData>(FETCH_LISTINGS);
  const listings = data ? data.listings : null;

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariable>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({
      variables: { id },
      refetchQueries: [FETCH_LISTINGS],
    });
  };

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h3>Deletion of a listing in progress</h3>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h3>Uh Oh! Something went wrong - Please try again :( </h3>
  ) : null;

  const renderListings = () => {
    return (
      <ul>
        {listings &&
          listings.map((listing) => {
            return (
              <li key={listing.id}>
                {listing.title}
                <button onClick={() => handleDeleteListing(listing.id)}>
                  Delete listing
                </button>
              </li>
            );
          })}
      </ul>
    );
  };
  // const renderListings = () => {
  //   return (
  //     <List
  //       itemLayout="horizontal"
  //       dataSource={listings}
  //       renderItem={(listing) => (
  //         <List.Item
  //           actions={[
  //             <Button
  //               type="primary"
  //               onClick={() => handleDeleteListing(listing.id)}
  //             >
  //               Delete
  //             </Button>,
  //           ]}
  //         >
  //           <List.Item.Meta
  //             title={listing.title}
  //             description={listing.address}
  //             avatar={<Avatar src={listing.image} shape="square" size={48} />}
  //           />
  //         </List.Item>
  //       )}
  //     />
  //   );
  // };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Uh Oh! Something went wrong - Please try again :( </h3>;
  }
  return (
    <div className="listings">
      <h3>{title}</h3>
      {renderListings()}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
