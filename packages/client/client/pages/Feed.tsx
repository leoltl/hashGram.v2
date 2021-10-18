import React from "react";
import { PostSingle } from "../components";

const mockPost = {
  postId: "abc123",
  posterId: "user123",
  posterName: "alice",
  postImageUrl: "https://hashgram.s3.amazonaws.com/user-content/e919d2cad572258e554cf21bebcc739b",
  likesCount: 12,
  comments: [],
}

const Feed: React.FC = () => {
  return (
    <div>
      <PostSingle {...mockPost}/>
    </div>
  )
};

export default Feed;