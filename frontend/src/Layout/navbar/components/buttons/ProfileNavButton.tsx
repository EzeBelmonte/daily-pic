import { useMe } from "@/app/hooks/queries/useMe";
import { useModalButton } from "@/hooks/useModalButton";

import { Image, ModalList } from "@/components";

import ProfileItemsList  from "../lists/ProfileItemsList";

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
        className="left-0 max-w-[180px]"
      >
        <ProfileItemsList onClose={closeModal} /> 
      </ModalList>

    </>
  );
}

export default ProfileNavButton;