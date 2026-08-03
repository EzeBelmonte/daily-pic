import type { PostResponse } from "@daily-pic/shared/types";

import { Image } from "@/components";

type Props = {
  post: PostResponse
}

const PostContent = ({ post }: Props) => {

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
          src={post.imageUrl}
          alt="Imagen publicada"
          className="
            max-w-full max-h-[600px]
            w-auto h-auto
            object-contain
            rounded
          "
        />
      </div>

      {post.description !== "" && (
        <p className="text-white mt-3 mb-5">
          {post.description}
        </p>
      )}
    </>
  );
}

export default PostContent;