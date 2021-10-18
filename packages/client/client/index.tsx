import React from 'react';
import { hydrate } from "react-dom";
import { App } from "./components/app";
import { 
  ApolloProvider,
  InMemoryCache,
  ApolloClient
} from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { BrowserRouter as Router } from 'react-router-dom';

import { servicesMap } from "@leoltl/infra";

const { GATEWAY } = servicesMap;

const state = (window as any).__APOLLO_STATE__;

delete (window as any).__APOLLO_STATE__;

const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache().restore(state),
  uri: `${GATEWAY.host}:${GATEWAY.port}/${GATEWAY.endpoint}`,
  // link: createHttpLink({
  //   uri: "http://localhost:3000/graphql"
  // }),
});

hydrate(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root"),
)