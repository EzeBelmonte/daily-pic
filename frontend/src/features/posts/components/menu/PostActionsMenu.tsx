import { Ellipsis, Edit, Trash } from "lucide-react";

import { useParams } from "react-router-dom";
import { useModalButton } from "@/hooks/useModalButton";
import { useMe } from "@/app/hooks/queries/useMe";

import type { PostResponse } from "@daily-pic/shared/types";

import LikeButton from "../buttons/LikeButton";
import EditPost from "../EditPost";
import DeletePost from "./DeletePost";

import { 
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Modal,
} from "@/components";

import { cn } from "@/utils/cn";

type Props = {
  post: PostResponse
}

const PostActionsMenu = ({ post }: Props) => {
  const { postId } = useParams();

  const {
    open,
    setOpen,
  } = useModalButton();

  const {
    open: openEditModal,
    setOpen: setOpenEditModal,
  } = useModalButton();

  const {
    open: openDeleteModal,
    setOpen: setOpenDeleteModal,
  } = useModalButton();

  const { data: user } = useMe();

  if (!user) return null; 
  
  // Abrir menú de edición
  const handleOpenEdit = () => {
    setOpen(false);

    requestAnimationFrame(() => {
      setOpenEditModal(true);
    });
  };
  // Cerrar menú de edición
  const handleCloseEdit = () => {
    setOpenEditModal(false);
  };

  // Abrir menú de eliminación
  const handleOpenDelete = () => {
    setOpen(false);

    requestAnimationFrame(() => {
      setOpenDeleteModal(true);
    });
  };
  // Cerrar menú de eliminación
  const handleCloseDelete = () => {
    setOpenDeleteModal(false);
  };

  const buttonStyle = "flex items-center gap-2 text-[.8rem] hover:bg-white/10 w-full px-3 py-2";

  return (
    <>
      <div 
        style={
          post.id === Number(postId)
            ? { maxWidth: post.imageWidth }
            : {}
        }
        className="w-full flex justify-between p-2 mx-auto"
      >
        {/* Me gusta y listado de gente que dio "me gustas" */}
        <LikeButton postId={post.id} />

        {post.user.id === user.id && (
          <>
            {/* Más opciones */}
            <DropdownMenu
              open={open}
              onOpenChange={setOpen}
            >
              <DropdownMenuTrigger>
                <Button className="text-white">
                  <Ellipsis size={16} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                  side={"left"}
                  align={"end"}
                  sideOffset={5}
                  alignOffset={-1}
                >
                  <div className="      
                    flex flex-col 
                    bg-[#202020] rounded
                    border border-white/10
                  ">
                    <Button 
                      onClick={handleOpenEdit}
                      className={cn(
                        "text-white",
                        buttonStyle
                      )}
                    >
                      <Edit size={20} />
                      Editar
                    </Button>

                    <Button 
                      onClick={handleOpenDelete}
                      className={cn(
                        "text-red-400",
                        buttonStyle
                      )}
                    >
                      <Trash size={20} />
                      Elimiar
                    </Button>
                  </div>
                </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>

      <Modal
        open={openEditModal}
        onClose={handleCloseEdit}
      >
        <EditPost onClose={handleCloseEdit}/>
      </Modal>

      <Modal
        open={openDeleteModal}
        onClose={handleCloseDelete}
      >
        <DeletePost onClose={handleCloseDelete}/>
      </Modal>
    </>
  );
}

export default PostActionsMenu;