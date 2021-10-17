export class CommentPostInteraction {

  id: string;

  userId: string;

  body: string;

  timestamp: Date;

  toJson(): CommentPostInteractionGqlType {
    return {
      id: this.id,
      userId: this.userId,
      body: this.body,
      timestamp: this.timestamp.toString(),
    };
  }
};

export interface CommentPostInteractionGqlType {
  id: string;
  userId: string;
  body: string;
  timestamp: string;
}