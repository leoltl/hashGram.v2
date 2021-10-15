import { classToPlain, ClassTransformOptions } from "class-transformer";
import type { User as GqlUserType } from "../resolvers-types";

export abstract class BaseUser {
  
  id: string;
  
  email: string;
  
  name: string | null;
  
  isDeleted: boolean;
  
  passwordHash: string;

  createdAt: Date;

  serialize(options?: ClassTransformOptions) {
    return classToPlain(this, options) as GqlUserType;
  }
}