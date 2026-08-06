import { useNavigate } from "react-router-dom";

import { useTopLiked } from "../hooks/queries/useTopLiked";

import TopLikedCard from "./cards/TopLikedCard";

import { 
  LoaderSection, 
  AlertError,
} from "@/components";

const TopLiked = () => {
  const navigate = useNavigate();

  const {
    data: posts = [],
    isLoading,
    error,
  } = useTopLiked();

  if (isLoading) {
    return <LoaderSection />
  }

  if (error) {
    return (
      <AlertError 
        error={"Error al cargar los contactos"}
        className="w-[200px]"
      />
    );
  }

  return (
    <section className="
      flex flex-col
      items-center
      mt-8
    ">
      <h2 className="
        text-white text-[1.4rem]
        font-semibold
        mb-3
      ">
        Tus 3 post con más likes
      </h2>

      <article className="flex flex-col gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)}
            className="cursor-pointer"
          >
            <TopLikedCard post={post} />
          </div>
        ))}
      </article>
    </section>
  );
}

export default TopLiked;