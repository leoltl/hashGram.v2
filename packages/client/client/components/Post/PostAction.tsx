import styled from "@emotion/styled";
import React, { useState } from "react";
import { 
  Comment as CommentIcon,
  Like as LikeIcon, 
  Liked as LikedIcon,
  Save as SaveIcon, 
  Share as ShareIcon,
} from "../Icons";
interface PostActionProps {
  // likesCount: number;
  // liked?: boolean;
}

const PostAction: React.FC<PostActionProps> = ({
  // likesCount,
  // liked
}) => {
  const [liked, setLiked] = useState(false);
  return (
    <StyledActionSection>
      <StyledIconWrapper onClick={() => setLiked(!liked)} $liked={liked}>
        {liked ? <LikedIcon /> :<LikeIcon />}
      </StyledIconWrapper>
      <StyledIconWrapper>
        <CommentIcon />
      </StyledIconWrapper>
      <StyledIconWrapper>
        <ShareIcon />
      </StyledIconWrapper>
      <div className="divider"></div>
      <StyledIconWrapper>
        <SaveIcon />
      </StyledIconWrapper>
    </StyledActionSection>
  )
};

const StyledActionSection = styled.section`
  display: flex;
  margin: 0.25rem 0rem;
  > div:nth-of-type(4) {
    flex-grow: 1;
  }
`

const StyledIconWrapper = styled.div<{ $liked?: boolean }>`
  padding: 0.2rem;
  margin: 0rem 0.35rem;
  svg {
    fill: ${props =>
      props.$liked ? '#ed4956' : 'black'
    };
    &:hover {
      fill: ${props =>
        props.$liked ? '#ed4956' : '#8e8e8e'
      };
      cursor: pointer;
    }
  }
`

export default PostAction;
