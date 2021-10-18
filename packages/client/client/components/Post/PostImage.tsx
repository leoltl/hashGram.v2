import React from "react";

interface PostImageProps {
  postImageUrl: string
}

const PostImage: React.FC<PostImageProps> = ({
  postImageUrl,
}) => {
  return (
    <div>
      PostImage
    </div>
  )
}

export default PostImage;
