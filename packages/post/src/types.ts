import { Prisma, Post } from './__generated__/client';

export interface IPostRepository {
  get: (where: Prisma.PostWhereUniqueInput) => Promise<Post | null>
  getAll: () => Promise<Post[]>
  create: (user: Omit<Post, "id">) => Promise<Post>
  update: (id: string, user: Partial<Post>) => Promise<Post | null>
  delete: (id: string) => Promise<string>
}

export { Post } from "./__generated__/client";