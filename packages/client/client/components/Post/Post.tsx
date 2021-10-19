import React from "react";
import styled from "@emotion/styled";
import PostAction from "./PostAction";
import PostComment from "./PostComments";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostLikedBy from "./PostLikedBy";
import PostTimestamp from "./PostTimestamp";
import PostAddComment from "./PostAddComment";


export type IPostComment = {
  commenter?: {
    id: string;
    name: string;
  } | null;
  body?: string | null;
  timestamp?: string | null;
};

interface PostSingleProps {
  timestamp?: Date;
  post?: {
    postId?: string | null;
    owner?: {
      id: string;
      name: string;
    } | null
    postImageUrl?: string | null,
    createdAt?: Date | null
  }
  postInteraction?: {
    likesCount?: number | null
    comments?: IPostComment[] | null
  } | null;
}

const PostSingle: React.FC<PostSingleProps> = ({ 
  post,
  postInteraction
}) => {
  
  if (!post || !post.postId || !post.postImageUrl) return null
  
  return (
    <StyledPostWrapper>
      <PostHeader owner={post.owner} />
      <PostImage postImageUrl={post.postImageUrl} />
      <StyledBelowImage>
        <PostAction />
        <PostLikedBy likesCount={postInteraction?.likesCount ?? 0} />
        <PostComment comments={postInteraction?.comments ?? []} />
        <PostTimestamp timestamp={post.createdAt} />
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
