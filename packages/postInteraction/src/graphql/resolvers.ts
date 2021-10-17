import type { Resolvers } from "../resolvers-types";

const Query: Resolvers["Query"] = {
  interactionByPostId() {
    return {}
  }
};

const Mutation: Resolvers["Mutation"] = {
  async likePost(_, { postId }, { postInteractionService, user }) {
    if (user === null) {
      return {
        message: "Unauthorized: Sign in to like a post"
      }
    }
    return  await postInteractionService.likePost(postId, user.id);
  }
}

export const resolvers: Resolvers = {
  Query,
  Mutation,
}