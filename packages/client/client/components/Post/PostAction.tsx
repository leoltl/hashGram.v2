import React from "react";

interface PostActionProps {
  likesCount: number
}

const PostAction: React.FC<PostActionProps> = ({
  likesCount,
}) => {
  return (
    <div>
      PostAction
    </div>
  )
}

export default PostAction;
