import { plainToClass } from "class-transformer";
import { PostSingle as PostCls } from "./entities/SingleImagePost";

import type { IPostRepository } from "./types";
import type { Post as DbPostType } from '../__generated__/client';

class PostService {

  constructor(
    private postRepository: IPostRepository
  ) {}

  async postById(id: string) {
    const post = await this.postRepository.get({ id });

    if (post === null) {
      return null;
    }

    const postCls = this.instantiatePost(post);
    return postCls.serialize();
  }

  async postsByUserId(userId: string) {
    const posts = await this.postRepository.getAll({ ownerId: userId });

    return posts.map((post) => {
      const postCls = this.instantiatePost(post);
      return postCls.serialize();
    });
  }

  async createPost(imageUrl: string, userId: string) {
    const post = await this.postRepository.create({
      imageUrl,
      ownerId: userId,
      createdAt: new Date(),
      isDeleted: false,
    });

    const postCls = this.instantiatePost(post);
    return postCls.serialize();
  }

  async deleteById(id: string) {
    const deletedId = await this.postRepository.delete(id);
    return deletedId;
  }

  private instantiatePost(post: DbPostType) {
    return plainToClass(PostCls, post);
  }
}

export default PostService;
