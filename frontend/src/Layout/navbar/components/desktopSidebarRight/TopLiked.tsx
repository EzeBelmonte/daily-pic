import { useNavigate } from "react-router-dom";
import { useTopLiked } from "@/features/posts/hooks/queries/useTopLiked";

import { LoaderSection } from "@/components";
import TopLikedCard from "./TopLikedCard";

const TopLiked = () => {
  const navigate = useNavigate();

  const {
    data: posts,
    isLoading,
  } = useTopLiked();

  return (
    <section className="
      w-full
      mt-10 py-4
      border-t border-white/40 
      rounded-2xl
    ">
      <h2 className="
        font-outfit
        text-white text-center
        text-[1.1rem]
        mb-3
      ">
        Tus 3 publicaciones mas likeadas
      </h2>

      {isLoading ? (
        <LoaderSection />
      ) : posts?.length === 0 || posts === undefined ? (
        <p className="text-white">
          No hay fotos con likes
        </p>
      ) : (
        <article className="flex flex-col gap-3">
          {posts.map((post) => (
            <TopLikedCard 
              key={post.id}
              post={post} 
              onClick={() => navigate(`/post/${post.id}`)}
            />
          ))}
        </article>
      )}
    </section>
  );
}

export default TopLiked;