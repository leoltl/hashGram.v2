import { classToPlain, ClassTransformOptions, Expose } from "class-transformer";
import { Post as GqlPostType } from "../resolvers-types";


export abstract class BasePost {

  id: string;

  createdAt: string;

  ownerId: string;

  serialize(options?: ClassTransformOptions) {
    return classToPlain(this, options) as GqlPostType;
  }
}