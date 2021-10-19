import { Prisma, Post } from '../__generated__/client';

export interface IPostRepository {
  get: (where: Prisma.PostWhereUniqueInput) => Promise<Post | null>
  getAll: (where?: Prisma.PostWhereInput) => Promise<Post[]>
  create: (post: Omit<Post, "id">) => Promise<Post>
  update: (id: string, postUpdate: Partial<Post>) => Promise<Post | null>
  delete: (id: string) => Promise<string>
}

export { Post } from "../__generated__/client";