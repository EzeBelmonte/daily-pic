import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
}

const PostCard = ({ children }: Props) => {

  return (
    <article className="w-full max-w-[900px] mx-auto">
      {children}
    </article>
  );
}

export default PostCard;