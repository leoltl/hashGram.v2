import styled from "@emotion/styled";
import React from "react";

interface PostImageProps {
  postImageUrl: string
}

const PostImage: React.FC<PostImageProps> = ({
  postImageUrl,
}) => {
  return (
    <StyledPostImageSection>
      <img src={postImageUrl} />
    </StyledPostImageSection>
  )
}

const StyledPostImageSection = styled.section`
  & img {
    max-width: 100%;
    object-fit: contain;
  }
`

export default PostImage;
