import { useNavigate } from "react-router-dom";

import type { Post } from "@daily-pic/shared/types";

import { Image } from "@/components";

type Props = {
  posts: Post[];
}

const ProfileSection = ({ posts }: Props) => {
  const navigate = useNavigate();

  const handleGoPost = (postId: number) => {
    navigate(`/post/${postId}`);
  }

  return (
    <section className="
      w-full max-w-[900px]
      mx-auto
    ">
      <div className="
        grid grid-cols-2
      ">
        {posts.map((post) => (
          <div
            key={post.id}
            className="
              overflow-hidden
              flex items-center justify-center
            "
          >
            <Image 
              src={post.imageUrl}
              alt="Publicación"
              onClick={() => handleGoPost(post.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProfileSection;