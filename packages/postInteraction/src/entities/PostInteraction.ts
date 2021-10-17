import { classToPlain, Exclude, plainToClass, Type } from "class-transformer";
import { Document } from "mongodb";
import { v4 as uuid } from "uuid";
import { CommentPostInteraction, CommentPostInteractionGqlType } from "./Comment";
import { LikePostInteraction, LikePostInteractionGqlType } from "./Like";

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
      const newLike = plainToClass(
        LikePostInteraction,
        { userId: usrId , timestamp: now }
      )
      this.likes.push(newLike);
      this.updatedAt = now;
    }
  }

  addComment(userId: string, body: string) {
    const now = new Date();
    const newComment = plainToClass(
      CommentPostInteraction,
      { id: uuid(), userId, body, timestamp: now }
    );
    this.comments.push(newComment);
    this.updatedAt = now;
  }

  serialize() {
    return classToPlain(this);
  }

  toJson(): PostInteractionGqlType {
    return {
      postId: this.postId,
      comments: this.comments.map(comment => comment.toJson()),
      likes: this.likes.map(likes => likes.toJson()),
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    }
  }
};

export interface PostInteractionGqlType extends Document {
  postId: string;
  likes: LikePostInteractionGqlType[];
  comments: CommentPostInteractionGqlType[];
  updatedAt: string;
  createdAt: string;
}