import { classToPlain, ClassTransformOptions, Exclude, Expose } from "class-transformer";
import type { User as GqlUserType } from "../resolvers-types";

export abstract class BaseUser {
  
  id: string;
  
  email: string;
  
  name: string | null;

  @Exclude({ toPlainOnly: true })
  isDeleted: boolean;
  
  @Expose({ groups: ['auth']})
  passwordHash: string;

  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  serialize(options?: ClassTransformOptions) {
    return classToPlain(this, options) as GqlUserType;
  }
}