import { PostInteraction } from "./entities";

import type { IPostInteractionRepository, FindFilterType } from "./types";
import type { Collection } from "mongodb";


class PostInteractionRepository implements IPostInteractionRepository {

  constructor(
    private PostInteractionDb: Collection<PostInteraction>
  ) {}

  async get(where: FindFilterType) {
    return await this.PostInteractionDb.findOne(where);
  }

  async getAll(where: FindFilterType) {
    return await this.PostInteractionDb.find(where).toArray();
  }

  async create(postInteraction: PostInteraction) {
    const result = await this.PostInteractionDb.insertOne(postInteraction); 
    return await this.PostInteractionDb.findOne({ _id: result.insertedId });
  }

  async update(where: FindFilterType, postUpdate: Partial<PostInteraction>) {
    const result = await this.PostInteractionDb.updateOne(
      where,
      { $set: { ...postUpdate } },
      { upsert: true },
    );
    return await this.PostInteractionDb.findOne({ 
      _id: result.upsertedId 
    });
  }
  
  async delete(postId: string) {
    await this.PostInteractionDb.deleteOne({ postId });
    return postId;
  }
}

export default PostInteractionRepository;
