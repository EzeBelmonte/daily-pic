import { useNavigate } from "react-router-dom";

import type { PostResponse } from "@daily-pic/shared/types"

import PostUser from "@/features/posts/components/post/PostUser";
import PostDescription from "@/features/posts/components/post/PostDescription";
import PostImage from "@/features/posts/components/post/PostImage";
import PostActions from "@/features/posts/components/menu/PostActionsMenu";

type Props = {
  post: PostResponse;
}

const FeedPostCard = ({ post }: Props) => {
  const navigate = useNavigate();

  return (
    <article className="w-full max-w-[900px] mx-auto">
      {/* Usuario */}
      <PostUser user={post.user} />

      {/* Imagen */}
      <div 
        onClick={() => navigate(`/post/${post.id}`)}
        className="cursor-pointer"
      >
        <PostImage imageUrl={post.imageUrl} />
      </div>

      {/* Botones */}
      <PostActions post={post} />

      {/* Descripción */}
      <PostDescription 
        description={post.description} 
        className="ml-2"
      />
    </article>
  );
}

export default FeedPostCard;