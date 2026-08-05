import FeedLoader from "./FeedLoader";

import { useContactsFeed } from "../hooks/queries/useContactsFeed";

import PostCard from "@/features/posts/components/card/PostCard";

import { 
  LoaderSection,
} from "@/components";

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
    return <LoaderSection fullScreen />
  }

  return (
    <div className=" 
      flex flex-col
      justify-center
      mt-5 px-2 gap-4
    ">
      {posts.map((post) => (
        <div 
          key={post.id}
          className="
            w-full max-w-[600px] 
            mx-auto p-2
            border-b border-t border-white/20
            rounded-2xl cursor-pointer
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