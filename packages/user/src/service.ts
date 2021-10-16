import bcrypt from "bcrypt";
import { ClassTransformOptions, plainToClass } from "class-transformer";
import { uuid } from "./utils";
import { Admin as AdminCls, User as UserCls } from "./entities";
import { PrismaErrorHandler } from "./utils";

import type { IUserRepository } from "./types";
import type { SignUpInput } from "./resolvers-types";
import type { User as DbUserType } from "../__generated__/client";
class UserService {

  constructor(
    private userRepository: IUserRepository
  ) {}

  async userById(id: string) {
    const user = await this.userRepository.get({ id });
    
    if (user === null) {
      return null;
    };

    const userCls = this.instantiateUser(user);

    return userCls.serialize();
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
    
    let result: DbUserType;
    try {
      result = await this.userRepository.create(user);
    } catch (e) {
      const otherErr = PrismaErrorHandler(e);
      throw otherErr;
    }

    const userCls = this.instantiateUser(result);

    return userCls.serialize();
  }

  async signIn(email: string, password: string) {
    const result = await this.userRepository.get({ email });

    if (result === null) return null;

    const user = this.instantiateUser(result, { groups: ['auth']});

    if (await this.isCorrectPassword(password, user.passwordHash)) {
      return user.serialize();
    }

    return null;
  }

  private async hashPassword(plainText: string) {
    return await bcrypt.hash(plainText, 10);
  }

  private async isCorrectPassword(plainPassword: string, passwordHash: string) {
    return await bcrypt.compare(plainPassword, passwordHash);
  }

  private instantiateUser(plainUser: DbUserType, options?: ClassTransformOptions) {
    let user: AdminCls | UserCls;
    if (plainUser?.role === 'ADMIN') {
      user = plainToClass(AdminCls, plainUser, options);
    } else {
      user = plainToClass(UserCls, plainUser, options);
    }
    return user;
  }
}

export type IUserService = UserService;

export default UserService;