import type { Post } from "@shared/index";

import { Image } from "@/components";

type Props = {
  posts: Post[];
}

const ProfileSection = ({ posts }: Props) => {
  
  return (
    <section>
      <div>
        {posts.map((post) => (
          <Image 
            src={post.imageUrl}
            alt="Publicación"
          />
        ))}
      </div>
    </section>
  );
}

export default ProfileSection;