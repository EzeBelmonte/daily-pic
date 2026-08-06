import type { PostResponse } from "@daily-pic/shared/types";

import PostCard from "./PostCard";

import { 
  PostImage,
  LikeButton,
  PostDescription,

} from "../";

type Props = {
  post: PostResponse;
}

const PostSingle = ({ post }: Props) => {

  return (
    <PostCard>
      <PostImage imageUrl={post.imageUrl} />
      <LikeButton postId={post.id} />
      <PostDescription description={post.description} />
    </PostCard>
  );
}

export default PostSingle;