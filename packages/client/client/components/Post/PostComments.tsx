import styled from "@emotion/styled";
import React, { useState, useMemo, useCallback } from "react";
import type { IPostComment } from "./Post";

interface PostCommentProps {
  comments: IPostComment[]
}

const CommentRow: React.FC<IPostComment> = ({ userName, body }) => {
  const [textHidden, setTextHidden] = useState(true);
  
  const summary = useMemo(() => 
    body.substring(0, 80)
  ,[body]);
  
  const rest = useMemo(() => 
    body.substring(80)
  ,[body]);

  const More = useCallback(() => {
    return (
      <StyledMore onClick={() => setTextHidden(!textHidden)}>
        more
      </StyledMore>
    )
  }, [body, textHidden, setTextHidden]);

  if (rest) {
    return (
      <StyledPostComment>
        <StyledUserHandle>{userName}</StyledUserHandle> {summary}
        {
          textHidden 
            ? (
              <>
                <br />...<More />
              </>
            ) 
            : rest
        }
      </StyledPostComment>
    )
  }

  return (
    <StyledPostComment>
      <StyledUserHandle>{userName}</StyledUserHandle> {body};
    </StyledPostComment>
  )
};

const PostComment: React.FC<PostCommentProps> = ({
  comments,
}) => {
  if (comments.length === 0) return null;
  return (
    <div>
      {comments.map(comment => 
        <CommentRow key={comment.userId} {...comment} />
      )}
    </div>
  )
};

const StyledMore = styled.span`
  color: grey;
  cursor: pointer;
`

const StyledUserHandle = styled.span`
  font-weight: 700;
  cursor: pointer;
`

const StyledPostComment = styled.div`
  max-width: 100%;
  overflow-wrap: break-word;
  margin: 0.5rem 0;
`

export default PostComment;
