import express from "express";
import http from "http";
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { servicesMap } from "@leoltl/infra";
import { prisma } from "./database";
import { schema } from "./graphql";
import UserRepository from "./repository";
import UserService from "./service";
import { TokenManager } from "./utils";

import type { Express, Request } from 'express';

const PORT = servicesMap.USER.port;

interface JWTUser {
	id: string
	name: string
	email: string
}

function loadServices() {
	const repository = new UserRepository(prisma.user);
	const userService = new UserService(repository);
	return { userService };
}

function createRequestContext(services: ServicesContext, req: Request) {
	const stringifiedUserOrNull = req.headers.user as string;
	return { 
		...services, 
		tokenManager: new TokenManager(),
		user: JSON.parse(stringifiedUserOrNull) as JWTUser,
	};
}

type ServicesContext = ReturnType<typeof loadServices>;

export type RequestContext = ReturnType<typeof createRequestContext>;

async function user() {

	const app = express();

	app.get('/', async (req, res) => {
		res.send(`hi from user`)
	});
	
	await startApolloServer(app, loadServices());
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

user().catch(console.error)