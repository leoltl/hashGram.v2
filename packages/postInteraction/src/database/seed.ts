
const { MongoDB, POST_INTERACTION_COLLECTION_NAME } = require("./mongoDb");
const { POST_INTERACTION } = require("@leoltl/infra");

import type{ MongoClient } from "mongodb";

let client: MongoClient;

async function main() {
  const mongodb = new MongoDB();
  const db = await mongodb.init();
  client = mongodb.client;

  const PostInteractionDb = db.collection(POST_INTERACTION_COLLECTION_NAME);

  // delete all posts interaction
  await PostInteractionDb.deleteMany({});

  // insert postInteractions
  await PostInteractionDb.insertMany(Object.values(POST_INTERACTION))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await client.close()
  })