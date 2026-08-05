import { Ellipsis } from "lucide-react";

import { useParams } from "react-router-dom";
import { useModalButton } from "@/hooks/useModalButton";
import { useMe } from "@/app/hooks/queries/useMe";

import type { PostResponse } from "@daily-pic/shared/types";

import LikeButton from "../buttons/LikeButton";
import ActionList from "../lists/ActionList";
import { 
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components";

type Props = {
  post: PostResponse
}

const PostActions = ({ post }: Props) => {
  const { postId } = useParams();

  const {
    open,
    openModal,
    closeModal,
  } = useModalButton();

  const {
    data: user,
  } = useMe();

  if (!user) return; 
  
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
              onOpenChange={openModal}
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
                  <ActionList
                    postId={post.id}
                    onClose={closeModal}
                  />
                </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </>
  );
}

export default PostActions;