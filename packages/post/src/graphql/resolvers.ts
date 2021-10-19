import type { Resolvers } from "../resolvers-types";

const Query: Resolvers["Query"] = {
  async postById(_, { id }, { postService }) {
    return await postService.postById(id);
  },
  async postUploadSignedUrl(_, __, { gCloudService }) {
    return await gCloudService.generateSignedUrl();
  },
  async postByUser(_, { userId }, { postService }) {
    return await postService.postsByUserId(userId);
  },
  async postFeed(_, __, { postService, user }) {
    return await postService.postFeed(user?.id ?? null);
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

const User: Resolvers["User"] = {
  async posts(user, _, { postService }) {
    return await postService.postsByUserId(user.id);
  }
}

export const resolvers: Resolvers = {
  Query,
  Mutation,
  Post,
  User,
}