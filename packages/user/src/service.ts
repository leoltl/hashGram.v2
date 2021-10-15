import bcrypt from "bcrypt";
import { classToPlain, plainToClass } from "class-transformer";
import { uuid } from "./utils";
import { Admin as AdminCls, User as UserCls } from "./entities";
import { QueryResolvers, SignUpInput, User as GqlUserType } from "./resolvers-types";
import { IUserRepository } from "./types";
import { Prisma, User } from ".prisma/client";
import { PrismaErrorHandler } from "./utils/errorHandler";

class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async userById(id: string) {
    const user = await this.userRepository.get(id);
    
    if (user === null) {
      return null;
    };

    const userCls = this.instantiateUser(user);

    return classToPlain(userCls) as GqlUserType;
  }
  
  async signUp(input: SignUpInput) {

    if (input.password !== input.passwordConfirm) {
      throw new Error("Password confirm doesn't match")
    }
   
    const passwordHash =  await this.hashPassword(input.password);

    const userInput = {
      id: uuid(),
      name: input.name ?? null,
      email: input.email,
      role: 'USER' as const,
      isDeleted: false,
      createdAt: new Date(),
      passwordHash,
    };

    const user = plainToClass(UserCls, userInput, { groups: ['auth']});
    
    let result: User;
    try {
      result = await this.userRepository.create(user);
    } catch (e) {
      const otherErr = PrismaErrorHandler(e);
      throw otherErr;
    }

    const userCls = this.instantiateUser(result);

    return classToPlain(userCls) as GqlUserType;
  }

  private async hashPassword(plainText: string) {
    return await bcrypt.hash(plainText, 10);
  }

  private instantiateUser(plainUser: User) {
    let user: AdminCls | UserCls;
    if (plainUser?.role === 'ADMIN') {
      user = plainToClass(AdminCls, plainUser);
    } else {
      user = plainToClass(UserCls, plainUser);
    }
    return user;
  }
}

export type IUserService = UserService;

export default UserService;