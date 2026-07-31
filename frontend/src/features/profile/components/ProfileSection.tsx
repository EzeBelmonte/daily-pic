import { useNavigate } from "react-router-dom";

import type { Post } from "@shared/index";

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
      w-full max-w-[800px]
      mx-auto
    ">
      <div className="
        grid grid-cols-3
      ">
        {posts.map((post) => (
          <div
            key={post.id}
            className="
              aspect-[4/5]
              bg-black
              overflow-hidden
              flex items-center justify-center
            "
          >
            <Image 
              src={post.imageUrl}
              alt="Publicación"
              className="w-full h-full object-cover"
              onClick={() => handleGoPost(post.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProfileSection;