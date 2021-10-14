import { User } from "@prisma/client";

export interface IUserRepository {
  get: (id: string) => Promise<User | null>
  getAll: () => Promise<User[]>
  create: (user: User) => Promise<User>
  update: (id: string, user: Partial<User>) => Promise<User | null>
  delete: (id: string) => Promise<string>
}

export { User } from "@prisma/client";