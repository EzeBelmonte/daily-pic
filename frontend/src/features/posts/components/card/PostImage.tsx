import { Image } from "@/components";

type Props = {
  imageUrl: string;
}

const PostImage = ({ imageUrl }: Props) => {

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
          className="
            block
            max-w-full max-h-[800px]
            w-auto h-auto
            object-contain
            rounded
          "
        />
      </div>
    </>
  );
}

export default PostImage;