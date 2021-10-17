import type { Filter } from "mongodb";
import type { PostInteraction } from "./entities";

export type FindFilterType = Filter<PostInteraction>;

export interface IPostInteractionRepository {
  get: (where: FindFilterType) => Promise<PostInteraction | null>
  getAll: (where: FindFilterType) => Promise<PostInteraction[]>
  create: (post: PostInteraction) => Promise<PostInteraction | null>
  update: (where: FindFilterType, postUpdate: Partial<PostInteraction>) => Promise<PostInteraction | null>
  delete: (postId: string) => Promise<string>
}
