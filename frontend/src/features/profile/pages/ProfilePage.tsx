import { useParams } from "react-router-dom";
import { useProfileUser } from "../hooks/useProfileUser";
import { useBlock } from "@/features/block/hooks/queries/useBlock";

import { 
  ProfileHeader, 
  ProfileSection,
} from "../components";

import ProfileBlocked from "./ProfileBlocked";
import ProfileNotFound from "./ProfileNotFound";

import { 
  LoaderSection,
  AlertError
} from "@/components";

const ProfilePage = () => {
  // Obtenemos el usuario de la url si es que visitamos un perfil
  const { username } = useParams();

  const {
    data: block,  
    error: blockError,
    isLoading: blockLoading,
  } = useBlock(username ?? "");

  // Obtenemos mis datos o el del usuario visitado
  const {
    user,
    isOwner,
    isLoading: userLoading,
    error,
  } = useProfileUser(username);

  if (userLoading || blockLoading) {
    return <LoaderSection fullScreen />
  }

  if (error || blockError) {
    return (
      <AlertError 
        error={"Error al cargar el perfil"}
        className="w-[200px]"
      />
    );
  }

  if (!user) {
    return <ProfileNotFound />
  }

  if (block && block.blockerId === user.id) {
    return <ProfileBlocked />;
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