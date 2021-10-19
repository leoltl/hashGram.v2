import React from "react";
import { formatDistance } from 'date-fns'
import styled from "@emotion/styled";

const PostTimestamp: React.FC< { timestamp: Date }> = ({
  timestamp
}) => {
  return (
    <StyledPostTimestamp>
      {formatDistance(
        timestamp,
        new Date(),
        { addSuffix: true }
      )}
    </StyledPostTimestamp>
  )
};

const StyledPostTimestamp = styled.div`
  font-size: 0.65rem;
  color: #8e8e8e;
  text-transform: uppercase;
  margin: 0.25rem 0;
`;

export default PostTimestamp;
