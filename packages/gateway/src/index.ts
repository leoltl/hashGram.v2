import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import expressJwt from "express-jwt";
import { getServiceList } from "@leoltl/infra";

interface IGatewayContext {
  user?: {
    id: string;
    name: string;
    email: string;
  }
}

const PORT = 3000;

const jwtSecretKey = process.env.JWT_SECRET || "cannotGuessThis";
const jwtAlgorithms = ['HS256'];

async function start() {
  
  const app = express();

  app.use(
    expressJwt({
      secret: jwtSecretKey,
      algorithms: jwtAlgorithms,
      credentialsRequired: false,
    })
  );

  const gateway = new ApolloGateway({
    serviceList: getServiceList(),
    buildService({ url }) {
      return new RemoteGraphQLDataSource({
        url,
        willSendRequest({ request, context }) {
          request.http?.headers.set(
            "user",
            (context as IGatewayContext).user ? JSON.stringify((context as IGatewayContext).user) : JSON.stringify(null)
          )
        }
      })
    }
  });
  
  const server = new ApolloServer({
    gateway,
    context: ({ req }) => {
      const user = req.user ?? null;
      return {
        user
      }
    }
  });

  await server.start();
  
  server.applyMiddleware({ app });
  
  app.listen({ port:PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

start().catch(console.error)