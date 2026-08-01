import { useParams } from "react-router-dom";

import { useProfileUser } from "../hooks/useProfileUser";

import { 
  ProfileHeader, 
  ProfileSection 
} from "../components";

import { useProfilePosts } from "../hooks/useProfilePosts";

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
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar el perfil.</p>;
  }

  if (!user) {
    return <p>Usuario no encontrado.</p>;
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
        <p>Cargando publicaciones...</p>
      ) : posts.length === 0 ? (
        <p className="text-white">No hay publicaciones</p>
      ) : (
        <ProfileSection posts={posts} />
      )}
    </section>
  );
}

export default ProfilePage;