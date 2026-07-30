import type { CompleteUser } from "@shared/index";

import { Image, Button } from "@/components";

import { cn } from "@/utils/cn";

type Props = {
  user: CompleteUser;
  isOwner: boolean;
}

const ProfileHeader = ({ user, isOwner }: Props) => {
  // flex-1: Hace que ambos botones ocupen el mismo espacio disponible
  const buttonStyle = "flex-1 sm:flex-none sm:w-[140px] rounded text-[.9rem] py-0.5";

  // Estilo base de la Bio
  const bioStyle = "w-full max-w-[500px] mb-3";

  return (
    <header className="px-2 py-4">
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

      {/* Botón de seguir y bloquear */}
      {!isOwner &&
        <div className="
          flex gap-5 text-white
        ">
          <Button className={cn(
            "bg-[#145fb4]",
            buttonStyle
          )}>
            Seguir
          </Button>

          <Button className={cn(
            "bg-[#b30e0e]",
            buttonStyle
          )}>
            Boquear
          </Button>
        </div>
      }
    </header>
  );
}

export default ProfileHeader;