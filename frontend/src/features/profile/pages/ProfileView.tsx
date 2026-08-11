import type { CompleteUser } from "@daily-pic/shared/types";

import { 
  ProfileHeader, 
  ProfileSection,
} from "../components";

type Props = {
  user: CompleteUser;
  isOwner: boolean;
}

const ProfileView = ({
  user,
  isOwner
}: Props) => {

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

export default ProfileView;