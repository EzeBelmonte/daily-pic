import { useSearchParams } from "react-router-dom";
import { useScroll } from "@/hooks/useScroll";

import type { FeedType } from "../types/feed.type";

import { cn } from "@/utils/cn";

import { Button } from "@/components";
import ContactsFeed from "../components/sections/ContactsFeed";
import DiscoverFeed from "../components/sections/DiscoverFeed";


const FeedPage = () => {
  const { scrollingUp } = useScroll();

  const [searchParams, setSearchParams] = useSearchParams();
  
  const typeParam  = searchParams.get("type") as FeedType;
  const feedType: FeedType =
    typeParam === "discover"
      ? "discover"
      : "contacts";
  
  // Función para cambiar el tipo de feed
  const changeFeed = (type: FeedType) => {
    setSearchParams({ type });
  }

  const buttonDefaultStyle = "mx-auto w-[150px]";
  const buttonSelectStyle = "text-blue-500 transition-colors duration-200";

  return (
    <section className="
      w-full min-h-screen
      mt-10 sm:mt-0
    ">
      {/* Botónes */}
      <div className={cn(`
        grid grid-cols-2
        py-1 sm:py-2 md:py-3
        font-semibold
        text-white
        bg-[rgba(31,31,31,0.5)]
        border-b border-white/20

        transform transition-all duration-300 ease-in`,
        scrollingUp
          ? "translate-y-0 opacity-100"
          : "-translate-y-10 opacity-0"
      )}>
        <Button 
          onClick={() => changeFeed("contacts")}
          className={cn(feedType === "contacts" ? buttonSelectStyle : buttonDefaultStyle )}
        >
          Contactos
        </Button>

        <Button 
          onClick={() => changeFeed("discover")}
          className={cn(feedType === "discover" ? buttonSelectStyle : buttonDefaultStyle )}
        >
          Descubrir
        </Button>
      </div>

      {feedType === "contacts" ? (
        <ContactsFeed />
      ) : (
        <DiscoverFeed />
      )}
    </section>
  );
}

export default FeedPage;