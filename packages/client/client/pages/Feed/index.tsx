
import React from "react";
import { useGet_AllQuery } from "../../generated-types";
import { PostSingle } from "../../components";

const Feed: React.FC = () => {
  const { loading, data, error } = useGet_AllQuery();
  
  if (loading || !data || !data.postFeed) return null;
  return (
    <div>
      {data.postFeed.map((post) => {
          
          if (!post) return null;

          const _post = { 
            postId: post.id, 
            owner: post.owner,
            postImageUrl: post.imageUrl,
            createdAt: new Date(Number(post.createdAt))
          }
          
          return (
            <PostSingle
              key={post.id}
              post={_post}
              postInteraction={post.postInteraction}
            />
          )
        })
      }
    </div>
  )
};

export default Feed;