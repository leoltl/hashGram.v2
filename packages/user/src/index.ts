import express from "express";
import http from "http";
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { prisma } from "./database";
import { schema, ResolversBuilder, makeUserQueries, makeUserMutations } from "./graphql";
import UserRepository from "./repository";
import UserService from "./service";

import type { Express } from 'express';
import type { GraphQLSchema } from "graphql";
import type { Resolvers } from "./resolvers-types";


const PORT = 3002;

function bootstrap() {
	const repository = new UserRepository(prisma.user);
	const service = new UserService(repository);
	const resolvers = new ResolversBuilder(service, makeUserQueries, makeUserMutations).build();
	return { resolvers, schema };
}

async function user() {

	const app = express();

	app.get('/', async (req, res) => {
		const result = prisma.user.findMany();
		res.send("hi from user")
	});

	const { resolvers, schema } = bootstrap();
	
	await startApolloServer(app, schema, resolvers);
}

async function startApolloServer(app: Express, schema: GraphQLSchema, resolvers: Resolvers) {
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		schema,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
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