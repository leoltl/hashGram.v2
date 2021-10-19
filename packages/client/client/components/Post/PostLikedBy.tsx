import styled from "@emotion/styled";
import React from "react";

interface PostLikedByProps {
  likesCount?: number;
}

const PostLikedBy: React.FC<PostLikedByProps> = ({
  likesCount
}) => {
  return (
    <StyledLikedBySection>
      {
        likesCount 
          ? <>{likesCount} like{likesCount > 1 && "s"}</>
          : <>Be the first to <span className="like-this">like this</span></>
      }
    </StyledLikedBySection>
  )
};

const StyledLikedBySection = styled.section`
  margin: 0.5rem 0;
  .like-this {
    font-weight: 600;
    cursor: pointer;
  }
`

export default PostLikedBy;
