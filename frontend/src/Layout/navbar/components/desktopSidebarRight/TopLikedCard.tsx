import type { PostTopLiked } from "@daily-pic/shared/types";
import { Heart } from "lucide-react";

import { 
  PostImage,
  PostCard,
} from "@/features/posts/components";

import { formatCompactNumber } from "@/helpers/formatCompactNumber";

type Props = {
  post: PostTopLiked;
  onClick?: () => void;
}

const TopLikedCard = ({ 
  post,
  onClick,
}: Props) => {

  return (
    <PostCard key={post.id} className="relative" >
      <div className="
        absolute top-0 left-4
        flex items-center
        w-[100px]
        px-1
        bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(255,255,255,0)]
      ">
        <Heart 
          size={18}
          className="fill-red-500"
        />
        <p className="text-white">{formatCompactNumber(post.countLikes)}</p>
      </div>

      <PostImage 
        imageUrl={post.imageUrl}
        onClick={onClick}
      />
    </PostCard>
  );
}

export default TopLikedCard;