import type { Resolvers } from "../resolvers-types";

const Query: Resolvers["Query"] = {
  interactionByPostId(_, { postId }, { postInteractionService }) {
    return postInteractionService.interactionByPostId(postId);
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
  },
  async commentPost(_, { postId, body }, { postInteractionService, user }) {
    
    if (user === null) {
      return {
        message: "Unauthorized: Sign in to comment on a post"
      }
    }

    return await postInteractionService.commentPost(postId, user.id, body);
  }
}

export const resolvers: Resolvers = {
  Query,
  Mutation,
}