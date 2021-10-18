import React from "react";
import styled from "@emotion/styled";
import PostAction from "./PostAction";
import PostComment from "./PostComment";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";

// @TODO: fix type
export type IPostComment = any;

interface PostSingleProps {
  postId: string;
  posterId: string;
  posterName: string;
  postImageUrl: string;
  likesCount: number;
  comments: IPostComment[];
}

const PostSingle: React.FC<PostSingleProps> = ({ 
  postId,
  posterId,
  posterName,
  postImageUrl,
  likesCount,
  comments
}) => {
  

  return (
    <StyledPostWrapper>
      <PostHeader  {...{ posterId, posterName }} />
      <PostImage   {...{ postImageUrl }} />
      <PostAction  {...{ likesCount }} />
      <PostComment {...{ comments }} />
    </StyledPostWrapper>
  )
};

const StyledPostWrapper = styled.div`
  background-color: red;
  margin: 100px;
  > div {
    background-color: blue
    padding: 5px;
  }
  display: flex;
  flex-direction: column;
`;

export default PostSingle;
