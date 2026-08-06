import { Heart } from "lucide-react";

import type { PostTopLiked } from "@daily-pic/shared/types";

import PostImage from "../post/PostImage";

import { formatCompactNumber } from "@/helpers/formatCompactNumber";

type Props = {
  post: PostTopLiked;
}

const TopLikedCard = ({ post }: Props) => {

  return (
    <div className="relative">
      <div className="
        w-[80px]
        flex items-center
        absolute
        bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(255,255,255,0)]
        rounded-tr-[10px]
        p-1
      ">
        <Heart 
          size={18}
          className="fill-red-500"
        />
        <p className="text-white">{formatCompactNumber(post.countLikes)}</p>
      </div>

      <PostImage 
        imageUrl={post.imageUrl}
      />


    </div>
  );
}

export default TopLikedCard;