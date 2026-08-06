import { Image } from "@/components";

import { cn } from "@/utils/cn";

type Props = {
  imageUrl: string;
  className?: string;
  onClick?: () => void;
}

const PostImage = ({ 
  imageUrl,
  className,
  onClick,
}: Props) => {

  return (
    <>
      <div className="
        w-full
        flex
        justify-center
        overflow-hidden
        rounded 
      ">
        <Image
          src={imageUrl}
          alt="Imagen publicada"
          className={cn(`
            block
            max-w-full max-h-[800px]
            w-auto h-auto
            object-contain
            rounded`,
            onClick && "cursor-pointer",
            className
          )}
        />
      </div>
    </>
  );
}

export default PostImage;