import "reflect-metadata";
import express from "express";
import http from "http";
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { schema } from "./graphql";
import { servicesMap } from "@leoltl/infra";
import { MongoDB } from "./database";
import PostInteractionRepository from "./repository";
import PostInteractionService from "./service";

import { JWTUser } from "@leoltl/user";

import type { Express, Request } from 'express';
import type { Db } from "mongodb";

const PORT = servicesMap.POST_INTERACTION.port;

function loadServices(db: Db) {
  const repository = new PostInteractionRepository(db.collection("postInteraction"));
  const postInteractionService = new PostInteractionService(repository); 
  
  return {
    postInteractionService
  }
}

function createRequestContext(services: ServicesContext, req: Request) {
  const stringifiedUserOrNull = req.headers.user as string;
  return { 
    ...services,
    user: JSON.parse(stringifiedUserOrNull) as JWTUser | null,
  };
}

type ServicesContext = ReturnType<typeof loadServices>;

export type RequestContext = ReturnType<typeof createRequestContext>;

async function postInteraction() {
  const app = express();
  
  app.get('/', (req, res) => {
      res.send("hi from post")
  });
  
  const db = await (new MongoDB()).init();
  await startApolloServer(app, loadServices(db));
}

async function startApolloServer(app: Express, services: ServicesContext) {
  const httpServer = http.createServer(app);
  
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => createRequestContext(services, req),
  });

  await server.start();

  // mount apollo middleware
  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: PORT }, () => resolve(null)));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    
  return {
    server,
    app,
  }
}

postInteraction().catch(console.error)