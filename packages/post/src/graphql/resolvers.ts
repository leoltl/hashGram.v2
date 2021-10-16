import type { Post as DbPostType } from "../../__generated__/client";
import type { Resolvers } from "../resolvers-types";

const Query: Resolvers["Query"] = {
  async postById(_, { id }, { postService }) {
    return await postService.postById(id);
  },
  async postUploadSignedUrl(_, __, { gCloudService }) {
    return await gCloudService.generateSignedUrl();
  }
};

const Mutation: Resolvers["Mutation"] = {
  async postCreate(_, { input }, { postService, user }) {
    if (user === null) {
      return {
        message: "Unauthorized: Sign in to create a post"
      }
    }
    const createdPost = await postService.createPost(
      input.imageUrl,
      user.id,
    );
    return {
      post: createdPost
    };
  }
}

const Post: Resolvers["Post"] = {
  owner(post) {
    return {
      __typename: "User",
      id: post.ownerId,
    }
  }
};


export const resolvers: Resolvers = {
  Query,
  Mutation,
  Post,
}