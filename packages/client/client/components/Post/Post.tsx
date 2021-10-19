import React from "react";
import styled from "@emotion/styled";
import PostAction from "./PostAction";
import PostComment from "./PostComments";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostLikedBy from "./PostLikedBy";
import PostTimestamp from "./PostTimestamp";
import PostAddComment from "./PostAddComment";

// @TODO: fix type
export type IPostComment = {
  userId: string;
  userName: string;
  body: string;
  timestamp: Date;
};

interface PostSingleProps {
  postId: string;
  posterId: string;
  posterName: string;
  postImageUrl: string;
  likesCount: number;
  comments: IPostComment[];
  timestamp: Date;
}

const PostSingle: React.FC<PostSingleProps> = ({ 
  postId,
  posterId,
  posterName,
  postImageUrl,
  likesCount,
  comments,
  timestamp,
}) => {
  

  return (
    <StyledPostWrapper>
      <PostHeader    {...{ posterId, posterName }} />
      <PostImage     {...{ postImageUrl }} />
      <StyledBelowImage>
        <PostAction />
        <PostLikedBy   {...{ likesCount }} />
        <PostComment   {...{ comments }} />
        <PostTimestamp {...{ timestamp }} />
      </StyledBelowImage>
      <PostAddComment />
    </StyledPostWrapper>
  )
};

const StyledBelowImage = styled.div`
  margin: 1rem;
`

const StyledPostWrapper = styled.article`
  max-width: 614px;
  min-width: 300px;
  border: thin solid var(--colors-border);
`;

export default PostSingle;
