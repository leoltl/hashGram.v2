import styled from "@emotion/styled";
import React, { useState } from "react";

const PostAddComment: React.FC = ({
  
}) => {
  const [comment, setComment] = useState("");
  return (
    <StyledAddCommentSection>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={1} placeholder="Add a comment..." />
      <button className="post-comment-btn" disabled={!comment}>Post</button>
    </StyledAddCommentSection>
  )
}

const StyledAddCommentSection = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid lightgrey;
  padding: 0.5rem 1rem;
  textarea {
    flex-grow: 1;
    border: none;
    margin: 1rem;
    font: var(--font);
  }
  .post-comment-btn {
    border: none;
    background-color: white;
    color: var(--colors-primary);
    font-weight: 400;
    padding: 0.3rem;
    cursor: pointer;
    &:disabled {
      opacity: 0.3;
    }
    resize: none;
  }
`

export default PostAddComment;
