import { useMe } from "@/app/hooks/queries/useMe";
import { useModalButton } from "@/hooks/useModalButton";

import { cn } from "@/utils/cn";

import { Image, ModalList } from "@/components";

import ProfileItemsList  from "../lists/ProfileItemsList";

type Props = {
  className?: string;
  variant?: "compact" | "expanded";
}
const ProfileNavButton = ({ 
  variant,
  className 
}: Props) => {
  const {
    open,
    openModal,
    closeModal,
  } = useModalButton();

  const {
    data: user,
    isLoading,
    error,
  } = useMe();

  if (error) {
    return <p>Se produjo un error: {error.message}</p>
  }

  const compact = variant === "compact";

  const imageStyle = compact
    ? "w-7 h-7 "
    : "w-10 h-10 ms-3"

  const modalStyle = compact
    ? "top-9 left-0"
    : "bottom-4 left-17"

  const divStyle = !compact
    ? "flex items-center gap-2 text-white"
    : ""

  return (
    <div className={className}>
      {isLoading ? (
        <div className="bg-gray-600 w-7 h-7 rounded-full" />
      ) : (
        <div className={divStyle}>
          <Image 
            src={user?.profileImageUrl ?? ""}
            alt="Foto perfil"
            className={cn(
              "rounded-full cursor-pointer",
              imageStyle
            )}
            onClick={openModal}
          />

          {!compact &&
            <div>
              <p>{user?.name} {user?.lastname}</p>
              <p className="text-[.8rem] text-gray-500">@{user?.username}</p>
            </div>
          }
        </div>
      )}
      
      <ModalList 
        open={open}
        onClose={closeModal}
        className={cn(`
          max-w-[180px]
          rounded-bl rounded-br
          sm:rounded`,
          modalStyle
        )}
      >
        <ProfileItemsList onClose={closeModal} /> 
      </ModalList>

    </div>
  );
}

export default ProfileNavButton;