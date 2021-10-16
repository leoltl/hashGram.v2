import express from "express";
import http from "http";
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { servicesMap } from "@leoltl/infra";

import { JWTUser } from "@leoltl/user";

import type { Express, Request } from 'express';
import { schema } from "./graphql";

const PORT = servicesMap.POST.port;


function loadServices() {
    return {}
}

function createRequestContext(services: ServicesContext, req: Request) {
	const stringifiedUserOrNull = req.headers.user as string;
	return { 
		...services,
		user: JSON.parse(stringifiedUserOrNull) as JWTUser,
	};
}

type ServicesContext = ReturnType<typeof loadServices>;

export type RequestContext = ReturnType<typeof createRequestContext>;

async function post() {

    const app = express();
    
    app.get('/', (req, res) => {
        res.send("hi from post")
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

post().catch(console.error)