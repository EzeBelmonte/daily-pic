import { Frown } from "lucide-react";

const ProfileBlocked = () => {

  return (
    <section className="
      flex
      px-1 mt-20 gap-1
      justify-center
      items-center
    ">
      <p className="text-white">El usuario te ha bloqueado</p>
      <Frown 
        size={30}
        className="fill-amber-400"
      />
    </section>
  );
}

export default ProfileBlocked;