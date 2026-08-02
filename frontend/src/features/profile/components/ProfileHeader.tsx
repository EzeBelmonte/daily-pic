import type { CompleteUser } from "@shared/index";

import ProfileHeaderInformation from "./ProfileHeaderInformation";

type Props = {
  user: CompleteUser;
  isOwner: boolean;
}

const ProfileHeader = ({ user, isOwner }: Props) => {

  return (
    <header className="px-2 py-4 mt-10 sm:mt-0">
  
      <ProfileHeaderInformation 
        user={user} 
        isOwner={isOwner}
      />

    </header>
  );
}

export default ProfileHeader;