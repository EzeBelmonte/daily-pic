import type { PostResponse } from "@daily-pic/shared/types"

import PostContent from "./card/PostContent";
import PostActions from "./card/PostActions";

type Props = {
  post: PostResponse;
}

const PostCard = ({ post }: Props) => {

  return (
    <article className="w-full max-w-[900px] mx-auto">
      {/* Imagen y descripción */}
      <PostContent post={post} />

      {/* Botones */}
      <PostActions post={post} />
    </article>
  );
}

export default PostCard;