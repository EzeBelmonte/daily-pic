import { useParams } from "react-router-dom";

import { usePost } from "../hooks/queries/usePost";

import PostSingle from "../components/cards/PostISingle";

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
      <PostSingle post={post} />
    </main>
  );
}

export default PostPage;