import { Db, MongoClient } from "mongodb";

export const POST_INTERACTION_COLLECTION_NAME = 'postInteraction';

export class MongoDB {
  private MONGODB_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017";
  private DB_NAME = "hashgram_PostInteraction";
  public readonly client: MongoClient;
  private db: Db;
  
  constructor() {
    this.client = new MongoClient(this.MONGODB_URI);
  }
  
  async init() {
    await this.client.connect();
    this.db = this.client.db(this.DB_NAME);
    return this.db;
  }
};
