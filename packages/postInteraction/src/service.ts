import { plainToClass } from "class-transformer";
import { PostInteraction } from "./entities";
import { IPostInteractionRepository } from "./types";

class PostInteractionService {

  constructor(
    private postInteractionRepository: IPostInteractionRepository
  ) {}

  async likePost(postId: string, userId: string) {
    const result = await this.postInteractionRepository.get({ postId });

    let postInteractionCls: PostInteraction;
    if (result) {
      postInteractionCls = plainToClass(PostInteraction, result);
    } else {
      postInteractionCls = plainToClass(PostInteraction, { postId });
    }
    
    postInteractionCls.addLike(userId);
    
    await this.postInteractionRepository.update(
      { postId },
      postInteractionCls.serialize(),
    );
    
    return {
      likes: postInteractionCls.likes.length,
    };
  }
}

export default PostInteractionService;
