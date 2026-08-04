import { useNavigate } from "react-router-dom";

import type { Post } from "@daily-pic/shared/types";

import { Image } from "@/components";

type Props = {
  posts: Post[];
};

const ProfileSection = ({ posts }: Props) => {
  const navigate = useNavigate();

  const handleGoPost = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  return (
    <section className="
      w-full max-w-[900px]
      mx-auto columns-2 gap-2
    ">
      {posts.map((post) => (
        <div 
          onClick={() => handleGoPost(post.id)}
          className="w-full"
        >
          <Image
            src={post.imageUrl}
            alt="Publicación"
            className="reveal-image"
          />
        </div>
      ))}
    </section>
  );
};

export default ProfileSection;