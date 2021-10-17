import { classToPlain, Exclude, Type } from "class-transformer";
import { Document } from "mongodb";
import { CommentPostInteraction } from "./Comment";
import { LikePostInteraction } from "./Like";

export class PostInteraction implements Document {

  @Exclude()
  _id: any;

  postId: string;
  
  @Type(() => LikePostInteraction)
  likes: LikePostInteraction[] = [];

  @Type(() => CommentPostInteraction)
  comments: CommentPostInteraction[] = [];

  updatedAt: Date = new Date();

  createdAt: Date = new Date();

  addLike(usrId: string) {
    if (!this.likes.find(({ userId }) => userId === usrId)) {
      const now = new Date();
      this.likes.push({ userId: usrId , timestamp: now });
      this.updatedAt = now;
    }
  }

  serialize() {
    return classToPlain(this);
  }
};
