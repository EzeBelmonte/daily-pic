import FeedLoader from "../components/FeedLoader";

import { useContactsFeed } from "../hooks/queries/useContactsFeed";

import PostCard from "@/features/posts/components/PostCard";

const FeedPage = () => {
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
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}

      <FeedLoader 
        onLoadMore={fetchNextPage}
        enabled={hasNextPage}
        loading={isFetchingNextPage}
      />
    </div>
  );
}

export default FeedPage;