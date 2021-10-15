import { IUserService } from "../service";
import type { Resolvers } from "../resolvers-types";

const Query: Resolvers["Query"] = {
  async userById(_, args, { userService }) {
    return await userService.userById(args.id);
  }
};

const Mutation: Resolvers["Mutation"] = {
  async signUp(_, args, { userService }) {
    return await userService.signUp(args.input);
  }
};

export const resolvers = {
  Query,
  Mutation,
};
