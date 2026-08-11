import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useProfilePosts } from "../hooks/useProfilePosts";
import { useBlock } from "@/features/block/hooks/queries/useBlock";

import { 
  Alert,
  LoaderSection,
  InfiniteScrollLoader
} from "@/components";

import { PostImageAnimated } from "@/features/posts/components";

const ProfileSection = () => {
  const navigate = useNavigate();
  
  // Obtenemos el usuario de la url si es que visitamos un perfil
  const { username } = useParams();
  
  const {
    data: block, 
  } = useBlock(username ?? "");

  const {
    posts,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useProfilePosts(username);

  if (isLoading) {
    return <LoaderSection />
  }

  if (error) {
    return <Alert message={"Error al obtener las publicaciones"} />
  }

  if (block && username) {
    return <Alert message={"Bloqueaste a este usuario"} />
  }

  return (
    <section className="columns-2 gap-2">
      {posts.map((post) => (
        <PostImageAnimated
          imageUrl={post.imageUrl}
          onClick={() => navigate(`/post/${post.id}`)}
        />
      ))}

      <InfiniteScrollLoader 
        onLoadMore={fetchNextPage}
        enabled={hasNextPage}
        loading={isFetchingNextPage}
      />
    </section>
  );
};

export default ProfileSection;