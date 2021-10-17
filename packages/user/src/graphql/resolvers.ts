import type { Resolvers } from "../resolvers-types";

const User: Resolvers['User'] = {
  async __resolveReference(object, { userLoader }) {
    return userLoader.load(object.id)
  },
  async followers(user, _, { userService }) {
    return await userService.getFollowers(user.id);
  },
  async followees(user, _, { userService }) {
    return await userService.getFollowees(user.id);
  }
}

const Query: Resolvers["Query"] = {
  async userById(_, args, { userLoader }) {
    return await userLoader.load(args.id);
  }
};

const Mutation: Resolvers["Mutation"] = {
  async signUp(_, args, { userService }) {
    return await userService.signUp(args.input);
  },
  async signIn(_, args, { userService, tokenManager }) {
    const { email, password } = args.input;
    const userOrNull = await userService.signIn(email, password);
    
    if (userOrNull === null) {
      return {
        token: null,
        message: "Sign in unsuccessful, please verify your credentials."
      }
    }

    return {
      token: tokenManager.sign(userOrNull),
      message: null
    }
  },
  async followUser(_, args, { userService, user }) {
    const { userToFollow } = args;
    
    if (user === null) {
      return {
        message: "Unauthorized: Sign in to follow someone",
      }
    }

    if (userToFollow === user.id) {
      return {
        message: "Bad Request: You cannot follow yourself",
      }
    }

    return await userService.toggleFollow(userToFollow, user.id);
  }
};

export const resolvers = {
  Query,
  Mutation,
  User,
};
