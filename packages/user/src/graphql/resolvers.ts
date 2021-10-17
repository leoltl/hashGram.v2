import type { Resolvers } from "../resolvers-types";

const User: Resolvers['User'] = {
  async __resolveReference(object, { userLoader }) {
    return userLoader.load(object.id)
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
  }
};

export const resolvers = {
  Query,
  Mutation,
  User,
};
