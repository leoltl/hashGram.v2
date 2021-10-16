import { IPostRepository, Post } from "./types";
import { Prisma, PrismaClient } from "./__generated__/client";

class PostRepository implements IPostRepository {
  
  constructor(
    private PostDb: PrismaClient["post"]
  ) {}

  async get(where: Prisma.PostWhereUniqueInput) {
    const post = await this.PostDb.findUnique({ 
      where 
    });
    if (post?.isDeleted) return null;
    return post
  }
  
  async getAll() {
    const posts = await this.PostDb.findMany();
    return posts;
  }
  
  async create(post: Omit<Post, "id">) {
    const savedPost = await this.PostDb.create({ 
      data: post 
    });
    return savedPost;
  }
  
  async update(id: string, postUpdate: Partial<Post>) {
    const updateResult = await this.PostDb.updateMany({ 
      where: { id, isDeleted: false }, 
      data: postUpdate 
    });

    if (updateResult.count < 1) return null;

    const updatedPost = await this.PostDb.findUnique({ 
      where: { id } 
    });
    return updatedPost;
  }
  
  async delete(id: string) {
    const deletedPost = await this.PostDb.update({ 
      where: { id },
      data: { isDeleted: true }
    });
    return deletedPost.id;    
  }
}

export default PostRepository;
