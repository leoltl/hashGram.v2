import express from 'express'
import path from 'path';
import fs from "fs";
import React from 'react';
import ReactDOMServer from "react-dom/server";
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { ssr as App } from './ssr';

const PORT = 3006;

const server = express();

server.use('/', express.static(path.join(__dirname, 'static')));

const manifest = fs.readFileSync(
  path.join(__dirname, 'static/manifest.json'),
  'utf-8'
);

const HtmlTemplate = fs.readFileSync(
  path.join(__dirname, ".." ,"public", "index.html"),
  'utf-8'
);

const assets = JSON.parse(manifest);

server.use((request, res) => {

  const client = new ApolloClient({
    ssrMode: true,
    uri:"http://localhost:3000/graphql",
    // link: createHttpLink({
    //   uri: "http://localhost:3000/graphql"
    // }),
    cache: new InMemoryCache(),
  });

  const context = {};

  const component = ReactDOMServer.renderToString(
    React.createElement(App, { context, request, client }),
  );

  const apolloInitialState = JSON.stringify(
    client.extract()
  ).replace(/</g, '\\u003c');

  const html = HtmlTemplate
    .replace("%CONTENT%", component)
    .replace("%SCRIPT%", assets["client.js"])
    .replace("%CACHE_STATE%", apolloInitialState);

  console.log('html', html)

  res.send(html)
});

server.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
});
