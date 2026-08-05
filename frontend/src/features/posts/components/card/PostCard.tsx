import type { PostResponse } from "@daily-pic/shared/types"

import PostDescription from "./PostDescription";
import PostImage from "./PostImage";
import PostActions from "./PostActions";

type Props = {
  post: PostResponse;
}

const PostCard = ({ post }: Props) => {

  return (
    <article className="w-full max-w-[900px] mx-auto">
      {/* Imagen*/}
      <PostImage imageUrl={post.imageUrl} />

      {/* Botones */}
      <PostActions post={post} />

      {/* Descripción */}
      <PostDescription description={post.description} />
    </article>
  );
}

export default PostCard;