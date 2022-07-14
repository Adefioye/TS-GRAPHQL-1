import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { Listings } from "./sections";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Listings title="Tiny House" />
  </ApolloProvider>,
  document.getElementById("root")
);
// "module": "esnext",

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
