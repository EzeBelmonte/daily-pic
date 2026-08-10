import { Heart } from "lucide-react";

import { useCountLikes } from "@/features/postLikes/hooks/queries/useCountLikes";
import { useAddLike } from "@/features/postLikes/hooks/mutations/useAddLike";
import { useRemoveLike } from "@/features/postLikes/hooks/mutations/useRemoveLike";
import { useHasLiked } from "@/features/postLikes/hooks/queries/useHasLiked";

import { Button } from "@/components";

import { cn } from "@/utils/cn";
import { formatCompactNumber } from "@/helpers/formatCompactNumber";

type Props = {
  postId: number;
  className?: string;
  maxWidth?: number;
}

const LikeButton = ({ 
  postId,
  className,
  maxWidth,
}: Props) => {
  const addLikeMutation = useAddLike();
  const removeLikeMutation = useRemoveLike();

  const {
    data: countLikes,
  } = useCountLikes(postId);
  
  const {
    data: hasLiked,
  } = useHasLiked(postId);

  const handleLike = () => {
    if (!hasLiked) {
      addLikeMutation.mutate(postId);
    } else {
      removeLikeMutation.mutate(postId);
    }
  }

  return (
    <div 
      className={cn(
        "flex gap-1.5 w-full mx-auto",
        className
      )}
      style={{
        maxWidth,
      }}
    >
      <Button
        onClick={handleLike}
      >
        <Heart 
          size={20} 
          className={cn(
            "text-red-500 cursor-pointer",
            hasLiked && "fill-red-500"
          )}
        />
      </Button>

      <Button
        className="text-white cursor-pointer"
      >
        {formatCompactNumber(countLikes)}
      </Button>
    </div>
  );
}

export default LikeButton;