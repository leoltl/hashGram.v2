import type { Resolvers } from "../resolvers-types";

const Query: Resolvers["Query"] = {

  async postById() {
    return {
      id: "123",
      createdAt: (new Date()).toISOString(),
      imageUrl: "http://google.ca",
      ownerId: "cc17bf4a-c725-41e4-aebb-3a8f54ae42ff"
    }
  }
};

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
  Post,
}