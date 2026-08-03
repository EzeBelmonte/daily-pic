import FeedLoader from "./FeedLoader";

import { useContactsFeed } from "../hooks/queries/useContactsFeed";

import PostCard from "@/features/posts/components/PostCard";

const ContactsFeed = () => {

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useContactsFeed();

  // Obtenemos los posts
  const posts =
    data?.pages.flatMap(
      (page) => page.posts
    ) ?? [];

  if (isLoading) {
    return (
      <p className="text-white">
        Cargando publicaciones...
      </p>
    );
  }

  return (
    <div className=" 
      flex flex-col
      justify-center
      mt-5 px-2
    ">
      {posts.map((post) => (
        <div 
          key={post.id}
          className="
            w-full max-w-[600px] 
            mx-auto p-2
            border border-white/20
            rounded-2xl
          "
        >
          <PostCard
            post={post}
          />
        </div>
      ))}

      <FeedLoader 
        onLoadMore={fetchNextPage}
        enabled={hasNextPage}
        loading={isFetchingNextPage}
      />
    </div>
  );
}

export default ContactsFeed;