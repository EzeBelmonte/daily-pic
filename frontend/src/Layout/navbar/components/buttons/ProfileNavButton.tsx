import { useMe } from "@/app/hooks/queries/useMe";
import { useModalButton } from "@/hooks/useModalButton";

import { Image, ModalList } from "@/components";

import ProfileNavCard  from "../cards/ProfileNavCard";

const ProfileNavButton = () => {
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

  return (
    <>
      {isLoading ? (
        <div className="bg-gray-600 w-7 h-7 rounded-full" />
      ) : (
        <Image 
          src={user?.profileImageUrl ?? ""}
          alt="Foto perfil"
          className="w-7 h-7 rounded-full cursor-pointer"
          onClick={openModal}
        />
      )}
      
      <ModalList 
        open={open}
        onClose={closeModal}
      >
        <ProfileNavCard onClose={closeModal} /> 
      </ModalList>

    </>
  );
}

export default ProfileNavButton;