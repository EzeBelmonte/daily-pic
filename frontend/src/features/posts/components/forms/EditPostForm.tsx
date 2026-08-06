import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/queries/usePost";
import { useEditPost } from "../../hooks/mutations/useEditPost";

import type{ PostSchema } from "@daily-pic/shared/schemas";

import { 
  Button,
  Textarea, 
  LoaderSection,
} from "@/components";

import showToast from "@/helpers/toast";
import { cn } from "@/utils/cn";

type Props = {
  onClose: () => void;
}

const EditPostForm = ({ onClose }: Props) => {
const { postId } = useParams();

if (!postId) return null;

const id = Number(postId);

const {
  data: post,
  isLoading,
  error,
} = usePost(id);

const [description, setDescription] = useState("");

const editPostMutation = useEditPost();

useEffect(() => {
  if (post) {
    setDescription(post.description ?? "");
  }
}, [post]);

useEffect(() => {
  if (error) {
    showToast("Error al obtener la publicación", "error");
  }
}, [error]);

if (isLoading) {
  return <LoaderSection />;
}

if (error) {
  return null;
}

  const handleEdit = async () => {
    const data: PostSchema = {
      description,
    };

    try {
      await editPostMutation.mutateAsync({
        postId: id,
        data,
      });

      // Solo limpiamos si el post se creó correctamente
      setDescription("");
      onClose();
    } catch (error) {
      // El error queda disponible en createPostMutation.error
    }
  }

  return (
    <>
      <Textarea 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Escribe una descripción..."
        className="w-[80vw] sm:w-[510px] mx-auto mb-3"
      />

      <div className="flex items-center gap-2 mt-5">
        <Button
          onClick={handleEdit}
          disabled={editPostMutation.isPending}
          className={cn(`
            rounded
            px-2 cursor-pointer
            text-white`,
            editPostMutation.isPending 
              ? "bg-gray-500"
              : "bg-[rgba(26,144,212,0.6)]"
          )}
            
        >
          {editPostMutation.isPending 
            ? "Editando..."
            : "Aceptar"
          }
        </Button>
      </div>
    </>
  );
}

export default EditPostForm;