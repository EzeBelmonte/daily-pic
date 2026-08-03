import { Trash, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { PostResponse } from "@daily-pic/shared/types"

import { formatNormalDate } from "@/helpers/formatterDate.helper";
import { Image, Button } from "@/components";
import { cn } from "@/utils/cn";

import { useMe } from "@/app/hooks/queries/useMe";

import { useDeletePost } from "../hooks/mutations/useDeletePost";

import { useCountLikes } from "../hooks/queries/useCountLikes";
import { useAddLike } from "../hooks/mutations/useAddLike";
import { useRemoveLike } from "../hooks/mutations/useRemoveLike";
import { useHasLiked } from "../hooks/queries/useHasLiked";

type Props = {
  post: PostResponse;
}

const PostCard = ({ post }: Props) => {
  const navigate = useNavigate();

  const deletePostMutation = useDeletePost();

  const addLikeMutation = useAddLike();
  const removeLikeMutation = useRemoveLike();

  const {
    data: countLikes,
  } = useCountLikes(post.id);

  const {
    data: hasLiked,
  } = useHasLiked(post.id);

  const {
    data: user,
  } = useMe();

  if (!user) {
    return <p>Error al cargar mi usuario</p>;
  }

  // Función para eliminar la publicación
  const handleDelete = async() => {
    try {
      await deletePostMutation.mutateAsync(post.id);
      navigate("/profile");
    } catch (error) {
      // El error ya está disponible en deletePostMutation.error
    }
  }

  const handleLike = () => {
    if (!hasLiked) {
      addLikeMutation.mutate(post.id);
    } else {
      removeLikeMutation.mutate(post.id);
    }
  }

  return (
    <>
      <Image 
        src={post.imageUrl}
        alt="Imagen publicada"
        className="rounded"
      />

      {/* Descripción */}
      {post.description !== "" &&
        <p className="text-white mt-3 mb-5">{post.description}</p>
      }

      {/* Botones */}
      <div className="w-full max-w-[350px] flex mb-3 justify-between">
        {/* Me gusta y listado de gente que dio "me gustas" */}
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

        {/* Eliminar publicación */}
        {post.user.id === user.id &&
          <Button 
            onClick={handleDelete}
            disabled={deletePostMutation.isPending}
            className="ms-auto cursor-pointer"
          >
            <Trash 
              size={20} 
              className={cn(
                deletePostMutation.isPending
                  ? "text-gray-500"
                  : "text-red-500"
              )}
            />
          </Button>
        }
      </div>

      {/* Fecha */}
      <p className="text-white/50 text-[.75rem] ms-auto">{formatNormalDate(post.createdAt)}</p>
    </>
  );
}

export default PostCard;