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
};

const PostInteraction: Resolvers["PostInteraction"] = {
  async __resolveReference(object, { postInteractionService }) {
    return await postInteractionService.interactionByPostId(object.postId);
  },
  likesCount(postInteraction) {
    if (postInteraction.likes) {
      return postInteraction.likes.length;
    }
    return null;
  },
  commentsCount(postInteraction) {
    if (postInteraction.comments) {
      return postInteraction.comments.length;
    }
    return null;
  }
};


const Post: Resolvers["Post"] = {
  async postInteraction(post, _, { postInteractionService}) {
    return await postInteractionService.interactionByPostId(post.id);
  }
};

export const resolvers: Resolvers = {
  Query,
  Mutation,
  PostInteraction,
  Post
}