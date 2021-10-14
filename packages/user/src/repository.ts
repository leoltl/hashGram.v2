import { PrismaClient, User } from ".prisma/client";

export interface IUserRepository {
  get: (id: string) => Promise<User | null>
  getAll: () => Promise<User[]>
  create: (user: User) => Promise<User>
  update: (id: string, user: Partial<User>) => Promise<User | null>
  delete: (id: string) => Promise<string>
}

class UserRepository implements IUserRepository {
  private UserDb: PrismaClient["user"];

  constructor(UserDb: PrismaClient["user"]) {
    this.UserDb = UserDb;
  }

  async get(id: string) {
    const user = await this.UserDb.findUnique({ 
      where: { id }
    });
    if (user?.isDeleted) return null;
    return user;
  }

  async getAll() {
    const users = await this.UserDb.findMany();
    return users;
  }

  async create(user: User) {
    const savedUser = await this.UserDb.create({ 
      data: user 
    });
    return savedUser;
  }

  async update(id: string, userUpdate: Partial<User>) {
    const updateResult = await this.UserDb.updateMany({ 
      where: { id, isDeleted: false }, 
      data: userUpdate 
    });

    if (updateResult.count < 1) return null;

    const updatedUser = await this.UserDb.findUnique({ 
      where: { id } 
    });
    return updatedUser;
  }

  async delete(id: string) {
    const deletedUser = await this.UserDb.update({ 
      where: { id },
      data: { isDeleted: true }
    });
    return deletedUser.id;
  }
}

export default UserRepository;