import React from "react";
import type { IPostComment } from "./Post";

interface PostCommentProps {
  comments: IPostComment
}

const PostComment: React.FC<PostCommentProps> = ({
  comments,
}) => {
  return (
    <div>
      PostComment
    </div>
  )
}

export default PostComment;
