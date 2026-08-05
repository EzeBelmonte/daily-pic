import { Heart } from "lucide-react";

import { useCountLikes } from "../../hooks/queries/useCountLikes";
import { useAddLike } from "../../hooks/mutations/useAddLike";
import { useRemoveLike } from "../../hooks/mutations/useRemoveLike";
import { useHasLiked } from "../../hooks/queries/useHasLiked";

import { Button } from "@/components";

import { cn } from "@/utils/cn";

type Props = {
  postId: number;
}

const LikeButton = ({ postId }: Props) => {
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
    <div className="flex gap-1.5">
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
        {countLikes}
      </Button>
    </div>
  );
}

export default LikeButton;