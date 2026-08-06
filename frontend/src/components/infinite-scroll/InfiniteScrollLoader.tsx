import { useEffect, useRef } from "react";

type Props = {
  onLoadMore: () => void;
  enabled: boolean;
  loading: boolean;
}

const InfiniteScrollLoader = ({
  onLoadMore,
  enabled,
  loading,
}: Props) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = loaderRef.current;

    if (!element || !enabled || loading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    }
  }, [enabled, loading, onLoadMore]);

  return (
    <div
      ref={loaderRef}
      className="py-4 text-center text-white"
    >
      {loading && "Cargando"}
    </div>
  );
}

export default InfiniteScrollLoader;