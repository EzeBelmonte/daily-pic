import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
}

const PostCard = ({ 
  children,
  className,
}: Props) => {

  return (
    <article className={cn(
      "w-full max-w-[900px] mx-auto",
      className
    )}>
      {children}
    </article>
  );
}

export default PostCard;