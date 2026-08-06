import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useProfilePosts } from "../hooks/useProfilePosts";

import { 
  LoaderSection,
  InfiniteScrollLoader
} from "@/components";

import { PostImageAnimated } from "@/features/posts/components";

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

  return (
    <section className="columns-2 gap-2">
      {isLoading ? (
         <LoaderSection />
      ) : posts.length === 0 ? (
          <p className="text-white">No hay publicaciones</p>
        ) : posts.map((post) => (
          <PostImageAnimated
            imageUrl={post.imageUrl}
            onClick={() => navigate(`/post/${post.id}`)}
          />
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