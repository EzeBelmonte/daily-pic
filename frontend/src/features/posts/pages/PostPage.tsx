import { useParams } from "react-router-dom";

import { usePost } from "../hooks/queries/usePost";

import  PostCard  from "../components/card/PostCard";

import { 
  LoaderSection,
  Alert,
  AlertError,
} from "@/components";

const PostPage = () => {
  const { postId } = useParams();

  const { 
    data: post,
    isLoading,
    error,
   } = usePost(Number(postId));

  if (isLoading) {
    return (
      <LoaderSection />
    );
  }

  if (error) {
    return (
      <AlertError 
        error={"Error al obtener la publicación"} 
        className="w-[250px]"
      />
    );
  }

  if (!post) {
    return (
      <Alert message={"Publicación no encontrada"} />
    );
  }

  return (
    <main className="
      w-full 
      px-4 py-10
    ">
      <PostCard post={post} />
    </main>
  );
}

export default PostPage;