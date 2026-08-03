import { useState } from "react";

import { useCreatePost } from "../hooks/mutations/useCreatePost";

import { 
  ImagePreview, 
  ImageUpload, 
  Button, 
  Textarea 
} from "@/components";

import type { CreatePost } from "@shared/src/index";

type Props = {
  onClose: () => void;
}

const CreatePostForm = ({ onClose }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const createPostMutation = useCreatePost();

  const handleSubmit = async () => {
    if (!image) {
      alert("Debes seleccionar una imagen.");
      return
    }

    const data: CreatePost = {
      description,
    };

    try {
      await createPostMutation.mutateAsync({
        image,
        data,
      });

      // Solo limpiamos si el post se creó correctamente
      setImage(null);
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

      <ImagePreview 
        file={image} 
        onRemove={() => setImage}
        className="w-40"
        buttonClassName="top-2 right-2"
      />

      <div className="flex items-center gap-2 mt-5">
        <Button
          onClick={handleSubmit}
          disabled={createPostMutation.isPending}
          className="
            bg-[rgba(26,144,212,0.6)] rounded
            px-2 cursor-pointer
            text-white
        ">
          {createPostMutation.isPending
            ? "Publicando..."
            : "Publicar"}
        </Button>

        <ImageUpload 
          onSelect={setImage} 
          onInvalidFile={() => alert("Ingresar UNA imagen")}
        />
      </div>
    </>
  );
}

export default CreatePostForm;