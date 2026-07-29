import { useParams } from "react-router-dom";

import { useProfileUser } from "../hooks/useProfileUser";

import { ProfileHeader } from "../components";

const ProfilePage = () => {
  const { username } = useParams();

  const {
    user,
    isOwner,
    isLoading,
    error,
  } = useProfileUser(username);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar el perfil.</p>;
  }

  if (!user) {
    return <p>Usuario no encontrado.</p>;
  }

  return (
    <div className="flex flex-col px-1 sm:px-2 md:px-3 lg:px-10">
      <ProfileHeader 
        user={user}
        isOwner={isOwner}
      />
    </div>
  );
}

export default ProfilePage;