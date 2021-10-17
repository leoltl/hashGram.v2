import { plainToClass } from "class-transformer";
import { PostInteraction } from "./entities";
import { IPostInteractionRepository } from "./types";

class PostInteractionService {

  constructor(
    private postInteractionRepository: IPostInteractionRepository
  ) {}

  async interactionByPostId(postId: string) {
    const result = await this.postInteractionRepository.get({ postId });

    if (result === null) return null;

    const postInteractionCls = plainToClass(PostInteraction, result);
    return postInteractionCls.serialize();
  }

  async likePost(postId: string, userId: string) {

    const postInteractionCls = await this.getByPostIdOrNew(postId);
    
    postInteractionCls.addLike(userId);
    
    await this.postInteractionRepository.update(
      { postId },
      postInteractionCls.serialize(),
    );
    
    return {
      likes: postInteractionCls.likes.length,
    };
  }

  async commentPost(postId: string, userId: string, body: string) {

    const postInteractionCls = await this.getByPostIdOrNew(postId);

    postInteractionCls.addComment(userId, body);
    
    await this.postInteractionRepository.update(
      { postId },
      postInteractionCls.serialize(),
    );
    
    return {
      comments: postInteractionCls.comments.map(comment => comment.toJson()),
    };
  }

  private async getByPostIdOrNew(postId: string) {
    const result = await this.postInteractionRepository.get({ postId });

    if (result) {
      return plainToClass(PostInteraction, result);
    }
    return plainToClass(PostInteraction, { postId });
  }
}

export default PostInteractionService;
