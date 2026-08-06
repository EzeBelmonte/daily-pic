import { useNavigate } from "react-router-dom";

import type { PostWithUser } from "@daily-pic/shared/types"

import { 
  PostUser,
  PostDescription,
  PostImage,
  PostActionsMenu,
  PostCard,
} from "@/features/posts/components";

type Props = {
  post: PostWithUser;
}

const FeedCard = ({ post }: Props) => {
  const navigate = useNavigate();

  return (
    <PostCard>
      {/* Usuario */}
      <PostUser 
        user={post.user} 
        onClick={() => navigate(`/profile/${post.user.username}`)}
      />

      {/* Imagen */}
      <PostImage 
        imageUrl={post.imageUrl} 
        onClick={() => navigate(`/post/${post.id}`)}
      />

      {/* Botones */}
      <PostActionsMenu post={post} />

      {/* Descripción */}
      <PostDescription 
        description={post.description ?? ""} 
        className="ml-2"
      />
    </PostCard>
  );
}

export default FeedCard;