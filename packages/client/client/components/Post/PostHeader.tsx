import React from "react";

interface PostHeaderProps {
  posterName: string;
  posterId: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  posterId,
  posterName,
}) => {
  return (
    <div>
      PostHeader
    </div>
  )
}

export default PostHeader;
