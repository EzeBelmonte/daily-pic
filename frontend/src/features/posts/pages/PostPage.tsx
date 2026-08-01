import { useParams } from "react-router-dom";

import { usePost } from "../hooks/queries/usePost";

import  PostCard  from "../components/PostCard";

const PostPage = () => {
  const { postId } = useParams();

  const { 
    data: post,
    isLoading,
    error,
   } = usePost(Number(postId));

  if (isLoading) {
    return <p className="text-white">Cargando...</p>;
  }

  if (error) {
    return <p className="text-white">Error al cargar el post.</p>;
  }

  if (!post) {
    return <p className="text-white">Post no encontrado.</p>;
  }

  return (
    <div className="
      max-w-[800px]
      flex flex-col 
      justify-center items-center 
      bg-[rgba(44,44,44,0.2)] rounded
      mx-auto p-10
    ">
      <PostCard post={post} />
    </div>
  );
}

export default PostPage;