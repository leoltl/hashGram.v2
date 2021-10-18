import "cross-fetch/polyfill";
import React from "react";
import { 
  ApolloProvider, 
  ApolloClient,
  NormalizedCacheObject 
} from '@apollo/client';
import { StaticRouter } from 'react-router';
import { App } from "../client/components/app";

import type Express from "express";
export const ssr: React.FC<{ 
  context?: {},
  request: Express.Request,
  client: ApolloClient<NormalizedCacheObject>,
}> = ({ 
  context = {}, 
  request,
  client
}) => {
  return (
    <ApolloProvider client={client}>
      <StaticRouter location={request.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  )
};
