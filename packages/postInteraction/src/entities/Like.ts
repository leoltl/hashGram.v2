export class LikePostInteraction {
  
  userId: string;

  timestamp: string;

  toJson(): LikePostInteractionGqlType {
    return {
      userId: this.userId,
      timestamp: this.timestamp.toString(),
    };
  }
};

export interface LikePostInteractionGqlType {
  userId: string;
  timestamp: string;
}
