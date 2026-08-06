import { useParams } from "react-router-dom";
import { useProfileUser } from "../hooks/useProfileUser";

import { 
  ProfileHeader, 
  ProfileSection,
} from "../components";

import { 
  LoaderSection,
  Alert,
  AlertError
} from "@/components";

const ProfilePage = () => {
  // Obtenemos el usuario de la url si es que visitamos un perfil
  const { username } = useParams();

  // Obtenemos mis datos o el del usuario visitado
  const {
    user,
    isOwner,
    isLoading: userLoading,
    error,
  } = useProfileUser(username);

  if (userLoading) {
    return <LoaderSection fullScreen />
  }

  if (error) {
    return (
      <AlertError 
        error={"Error al cargar el perfil"}
        className="w-[200px]"
      />
    );
  }

  if (!user) {
    return (
      <Alert message={"Usuario no encontrado"} />
    );
  }

  return (
    <section className="flex flex-col px-1">
      {/* Header */}
      <ProfileHeader 
        user={user}
        isOwner={isOwner}
      />

      {/* Sección */}
      <ProfileSection />
    </section>
  );
}

export default ProfilePage;