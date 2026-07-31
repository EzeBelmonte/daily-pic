import { useMe } from "@/app/hooks/queries/useMe";

import { Image } from "@/components";

const ProfileNavButton = () => {
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
        />
      )}
    </>
  );
}

export default ProfileNavButton;