import { Trash } from "lucide-react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useDeletePost } from "../../hooks/mutations/useDeletePost";

import { cn } from "@/utils/cn";
import { Button } from "@/components";

const DeleteButton = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const deletePostMutation = useDeletePost();

  const id = Number(postId);
  // Función para eliminar la publicación
  const handleDelete = async() => {
    try {
      await deletePostMutation.mutateAsync(id);
      navigate("/profile");
    } catch (error) {
      // El error ya está disponible en deletePostMutation.error
    }
  }

  return (
    <>
      <Button 
        onClick={handleDelete}
        disabled={deletePostMutation.isPending}
        className={cn(
          "text-[.85rem] flex items-center gap-2",
          deletePostMutation.isPending
            ? "text-gray-500"
            : "text-red-500"
        )}
      >
        <Trash size={14} />
        Eliminar
      </Button>
    </>
  );
}

export default DeleteButton;