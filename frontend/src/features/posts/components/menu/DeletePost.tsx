import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDeletePost } from "../../hooks/mutations/useDeletePost";

import { cn } from "@/utils/cn";

import { Button, LoaderSection } from "@/components";

type Props = {
  onClose: () => void;
}

const DeletePost = ({ onClose }: Props) => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const deletePostMutation = useDeletePost();

  const id = Number(postId);

  // Función para eliminar la publicación
  const handleDelete = async() => {
    try {
      await deletePostMutation.mutateAsync(id);

      onClose();

      navigate("/profile");
    } catch (error) {
      // El error ya está disponible en deletePostMutation.error
    }
  }

  const handleCancel = () => {
    onClose();
  }

  const buttonStyle = "rounded-[5px] borded px-2 py-1 text-white text-[.9rem]";

  return (
    <div className="
      block left-1/2 top-1/2 z-50
      w-[300px]
      -translate-y-1/2
      mx-auto
      px-2
      outline-none
    ">
      {!deletePostMutation.isPending ? (
        <div className="
          flex flex-col
          justify-center items-center
          bg-[#2b2b2b]
          border border-white/20
          rounded-2xl
          p-3
        ">
          <p className="
            text-center text-white
          ">
            ¿Seguro que deseas eliminar la publicación?
          </p>

          <div className="
            w-[300px]
            flex justify-around
            mt-5

          ">
            <Button
              onClick={handleDelete}
              className={cn(
                "bg-green-500/40 border-green-600/60",
                buttonStyle
              )}
            >
              Aceptar
            </Button>

            <Button
              onClick={handleCancel}
              className={cn(
                "bg-red-500/40 border-red-600/60",
                buttonStyle
              )}
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <LoaderSection fullScreen />
          <p className="absolute text-white font-semibold mt-10">Eliminando...</p>
        </div>
      )}
    </div>
  );
}

export default DeletePost;