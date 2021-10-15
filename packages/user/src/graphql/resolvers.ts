import { IUserService } from "../service";
import type { Resolvers } from "../resolvers-types";

const Query: Resolvers["Query"] = {
  async userById(_, args, ctx) {
    return await ctx.userService.userById(args.id);
  }
}

export const resolvers = {
  Query,
}