import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useProfilePosts } from "../hooks/useProfilePosts";

import { 
  Image,
  LoaderSection,
  InfiniteScrollLoader
} from "@/components";

const ProfileSection = () => {
  const navigate = useNavigate();
  
  // Obtenemos el usuario de la url si es que visitamos un perfil
  const { username } = useParams();
  
  const {
    posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useProfilePosts(username);

  const handleGoPost = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  return (
    <section className="
      w-full max-w-[900px]
      mx-auto columns-2 gap-2
    ">
      {isLoading ? (
         <LoaderSection />
      ) : posts.length === 0 ? (
          <p className="text-white">No hay publicaciones</p>
        ) : posts.map((post) => (
          <div 
            onClick={() => handleGoPost(post.id)}
            className="w-full cursor-pointer"
          >
            <Image
              src={post.imageUrl}
              alt="Publicación"
              className="reveal-image"
            />
          </div>
        )
      )}

      <InfiniteScrollLoader 
        onLoadMore={fetchNextPage}
        enabled={hasNextPage}
        loading={isFetchingNextPage}
      />
    </section>
  );
};

export default ProfileSection;