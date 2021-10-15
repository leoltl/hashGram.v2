import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { getServiceList } from "@leoltl/infra";

const port = 3000;
const app = express();


async function start() {

const gateway = new ApolloGateway({
    serviceList: getServiceList(),
  });
  
  const server = new ApolloServer({
    gateway,
  });

  await server.start();
  
  server.applyMiddleware({ app });
  
  app.listen({ port }, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}

start().catch(console.error)