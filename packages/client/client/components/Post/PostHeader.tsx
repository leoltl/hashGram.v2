import styled from "@emotion/styled";
import React from "react";

interface PostHeaderProps {
  posterName: string;
  posterId: string;
}

const MoreOption = () =>
<svg aria-label="More options" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
  <circle cx="12" cy="12" r="1.5"></circle>
  <circle cx="6.5" cy="12" r="1.5"></circle>
  <circle cx="17.5" cy="12" r="1.5"></circle>
</svg>

const randomProfilePicture = (name: string) => 
  <img src={`https://avatars.dicebear.com/api/pixel-art/${name}.svg`} />

const PostHeader: React.FC<PostHeaderProps> = ({
  posterId,
  posterName,
}) => {
  return (
    <StyledHeaderSection>
      <StyledProfileImage>
        {randomProfilePicture(posterId)}
      </StyledProfileImage>
      <div>
        <span>{posterName}</span>
      </div>
      <StyledAction>
        <MoreOption />
      </StyledAction>
    </StyledHeaderSection>
  )
};

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledProfileImage = styled(FlexContainer)`
  width: 42px;
  height: 42px;
  align-items: center;
  & img {
    max-width: 32px;
    max-height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const StyledAction = styled(FlexContainer)`
  width: 24px;
  height: 24px;
  font-size: 1.25rem;
  cursor: pointer;
`;

const StyledHeaderSection = styled.section`
  display: flex;
  height: 60px;
  align-items: center;
  margin: auto 0.75rem;
  > div:nth-of-type(2) {
    flex-grow: 1;
    padding: 0 0.75rem;
    font-weight: bold;
    span:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export default PostHeader;
