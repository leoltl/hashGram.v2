import { IUserService } from "../service";
import type { Resolvers } from "../resolvers-types";

export const makeUserQueries = (userService: IUserService): Resolvers["Query"] => ({
  async userById(parent, args) {
    return await userService.userById(args.id);
  }
});

export const makeUserMutations = (userService: IUserService) => ({});

export class ResolversBuilder {
  constructor(
    private userService: IUserService,
    private buildQueries: (...k: any) => Resolvers["Query"],
    private buildMutations: (...k: any) => Resolvers,
  ) {}

  build() {
    return {
      Query: this.buildQueries(this.userService),
      // Mutation: this.buildMutations(this.userService),
    }
  }
}