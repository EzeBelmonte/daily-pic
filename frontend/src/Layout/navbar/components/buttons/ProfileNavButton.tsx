import { useMe } from "@/app/hooks/queries/useMe";
import { useModalButton } from "@/hooks/useModalButton";

import { cn } from "@/utils/cn";

import { 
  Image, 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components";

import ProfileItemsList  from "../lists/ProfileItemsList";

type Props = {
  className?: string;
  variant: "compact" | "expanded";
}

const ProfileNavButton = ({ 
  variant,
  className,
}: Props) => {
  const {
    open,
    openModal,
    closeModal
  } = useModalButton();

  const {
    data: user,
    isLoading,
    error,
  } = useMe();

  if (error) {
    return <p>Se produjo un error: {error.message}</p>
  }

  const compact = variant === "compact";

  const imageStyle = compact
    ? "w-7 h-7 "
    : "w-10 h-10 ms-3"

  const divStyle = !compact
    ? "flex items-center gap-2 text-white"
    : ""

  return (
    <div className={className}>
      {isLoading ? (
        <div className="bg-gray-600 w-7 h-7 rounded-full" />
      ) : (
        <div className={divStyle}>
          <DropdownMenu
            open={open}
            onOpenChange={openModal}
          >
            <DropdownMenuTrigger>
              <Image
                src={user?.profileImageUrl ?? ""}
                alt="Foto perfil"
                className={cn(
                  "rounded-full cursor-pointer",
                  imageStyle
                )}
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side={compact ? "bottom" : "right"}
              align={compact ? "start" : "end"}
              sideOffset={compact ? 4 : 5}
              alignOffset={compact ? -20 : -1}
            >
              <ProfileItemsList
                 onClose={closeModal}
              />
            </DropdownMenuContent>
          </DropdownMenu>

          {!compact && (
            <div>
              <p>
                {user?.name} {user?.lastname}
              </p>

              <p className="text-[.8rem] text-gray-500">
                @{user?.username}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileNavButton;