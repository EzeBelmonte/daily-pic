import { useParams } from "react-router-dom";
import { useProfileUser } from "../hooks/useProfileUser";
import { useProfilePosts } from "../hooks/useProfilePosts";

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

  // Obtenemos mis posts o el del usuario visitado
  const {
    posts,
    isLoading: postsLoading,
  } = useProfilePosts(username);

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

      {/* Section */}
      {postsLoading ? (
        <Alert message={"Cargando publicaciones..."} />
      ) : posts.length === 0 ? (
        isOwner ? (
          <p className="text-white">No hay publicaciones</p>
        ) : (
          <p className="text-white">Perfil privado</p>
        )
      ) : (
        <ProfileSection posts={posts} />
      )}
    </section>
  );
}

export default ProfilePage;