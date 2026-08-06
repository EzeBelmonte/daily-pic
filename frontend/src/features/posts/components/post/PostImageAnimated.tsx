import { Image } from "@/components";

import { cn } from "@/utils/cn";

type Props = {
  imageUrl: string;
  className?: string;
  onClick?: () => void;
}

const PostImageAnimated = ({ 
  imageUrl,
  className,
  onClick,
}: Props) => {

  return (
    <>
      <Image
        src={imageUrl}
        alt="Imagen publicada"
        onClick={onClick}
        className={cn(
          "reveal-image",
          onClick && "cursor-pointer",
          className
        )}
      />
    </>
  );
}

export default PostImageAnimated;