import type { CompleteUser } from "@shared/index";

import ProfileHeaderInformation from "./ProfileHeaderInformation";
import ProfileHeaderStats from "./ProfileHeaderStats";

type Props = {
  user: CompleteUser;
  isOwner: boolean;
}

const ProfileHeader = ({ user, isOwner }: Props) => {

  return (
    <header className="px-2 py-4">
      <ProfileHeaderInformation user={user} />

      <ProfileHeaderStats 
        user={user}
        isOwner={isOwner}
      />
    </header>
  );
}

export default ProfileHeader;