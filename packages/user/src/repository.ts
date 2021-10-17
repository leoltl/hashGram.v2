import { Prisma, PrismaClient, User } from "../__generated__/client";
import { IUserRepository } from "./types";

class UserRepository implements IUserRepository {

  constructor(
    private UserDb: PrismaClient["user"],
    private FollowingDb: PrismaClient["following"]
  ) {}

  async get(where: Prisma.UserWhereUniqueInput) {
    const user = await this.UserDb.findUnique(
      { where }
    );
    if (user?.isDeleted) return null;
    return user;
  }

  async getAll(where: Prisma.UserWhereInput) {
    const users = await this.UserDb.findMany(
      { where }
    );
    return users;
  }

  async create(user: Omit<User, "id">) {
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

  async getFollowers(userId: string) {
    const user = await this.UserDb.findUnique({
      where: { id: userId },
      include: {
        followers: {
          include: {
            follower: true
          }
        },
      }
    });
    if (!user) return null;
    return user?.followers.map(({ follower }) => follower);
  }

  async getFollowees(userId: string) {
    const user = await this.UserDb.findUnique({
      where: { id: userId },
      include: {
        followees: {
          include: {
            followee: true
          }
        },
      }
    });
    if (!user) return null;
    return user?.followees.map(({ followee }) => followee);
  }

  async toggleFollow(followee: string, follower: string) {
    const compositeKey = {
      followeeId: followee,
      followerId: follower,
    } as const;

    const existingFollowing = await this.FollowingDb.findUnique({
      where: {
        followeeId_followerId: compositeKey
      }
    });

    if (existingFollowing) {
      await this.FollowingDb.delete({
        where: {
          followeeId_followerId: compositeKey
        }
      });

      return {
        following: false
      }
    }

    await this.FollowingDb.create({
      data: compositeKey,
    });

    return {
      following: true
    }
  }
}

export default UserRepository;
