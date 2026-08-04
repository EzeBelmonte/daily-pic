import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";

import type { Post } from "@daily-pic/shared/types";

import { Image } from "@/components";

import { getPostOrientation } from "../utils/getPostOrientation";
import { cn } from "@/utils/cn";

type Props = {
  posts: Post[];
};

const ProfileSection = ({ posts }: Props) => {
  const navigate = useNavigate();

  const handleGoPost = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const breakpointColumns = {
    default: 2,
    640: 2,
    0: 1,
  };

  return (
    <section className="
      w-full max-w-[900px]
      mx-auto
    ">
      <Masonry
        breakpointCols={breakpointColumns}
        className="
          flex
          w-auto
          -ml-1
        "
        columnClassName="
          pl-1
          bg-clip-padding
        "
      >
        {posts.map((post) => {
          const orientation =
            getPostOrientation(post);

          return (
            <div
              key={post.id}
              className="
                mb-1
                overflow-hidden
                cursor-pointer
              "
              onClick={() => handleGoPost(post.id)}
            >
              <div className={cn(
                "w-full",

                orientation === "portrait"
                  ? "aspect-[3/4]"
                  : orientation === "landscape"
                    ? "aspect-[4/3]"
                    : "aspect-square"
              )}>
                <Image
                  src={post.imageUrl}
                  alt="Publicación"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />
              </div>
            </div>
          );
        })}
      </Masonry>
    </section>
  );
};

export default ProfileSection;