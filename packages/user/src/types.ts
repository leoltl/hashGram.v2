import { Prisma, User } from "./__generated__/client";

export interface IUserRepository {
  get: (where: Prisma.UserWhereUniqueInput) => Promise<User | null>
  getAll: () => Promise<User[]>
  create: (user: Omit<User, "id">) => Promise<User>
  update: (id: string, user: Partial<User>) => Promise<User | null>
  delete: (id: string) => Promise<string>
}

export { User } from "./__generated__/client";