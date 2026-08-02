import type { CompleteUser } from "@shared/index";

import { cn } from "@/utils/cn";

import { Image } from "@/components";

import ProfileHeaderStats from "./ProfileHeaderStats";

type Props = {
  user: CompleteUser;
  isOwner: boolean;
}

const ProfileHeaderInformation = ({ 
  user,
  isOwner
}: Props) => {
  // Estilo base de la Bio
  const bioStyle = "w-full max-w-[500px] mb-3";

  return (
    <>
      <div className="flex gap-4 mb-3">

        {/* Imagen de perfil */}
        <Image 
          src={user.profileImageUrl}
          alt="Foto perfil"
          className="
            w-[85px] h-[85px] rounded-full
            md:w-[110px] md:h-[110px]
          "
        />

        {/* Información */}
        <div className="flex-1 text-white">

          {/* Nombre y apellido */}
          <div className="mb-2 md:text-[1.05rem]">
            <p>
              <span>{user.name} </span>
              {user.lastname !== "" &&
                <span>{user.lastname}</span>
              }
            </p>
          </div>
          
          {/* Stats */}
          <div className="
            flex gap-7 
            text-[.8rem] 
            sm:gap-10 
            md:text-[.9rem] md:gap-11 md:mb-5
          ">
            <div className="sm:flex sm:gap-1">
              <p>Fotos: </p>
              <p>{user.stats.postsCount}</p>
            </div>

            <div className="sm:flex sm:gap-1">
              <p>Contactos: </p>
              <p>{user.stats.contactsCount}</p>
            </div>
          </div>

          {/* Bio solamente en md+ */}
          <p className={cn(
              "hidden md:block text-[.9rem]",
              bioStyle
            )}
          >
            {user.bio}
          </p>

          {/* Botones solamente en md+ */}
          <ProfileHeaderStats 
            user={user}
            isOwner={isOwner}
            className={"hidden md:flex"}
          />
        </div>
      </div>

      {/* Bio solamente en móvil */}
      <p className={cn(
          "md:hidden text-[.8rem] text-white",
          bioStyle
        )}
      >
        {user.bio}
      </p>

      <ProfileHeaderStats 
        user={user}
        isOwner={isOwner}
        className={"md:hidden"}
      />
    </>
  );
}

export default ProfileHeaderInformation;