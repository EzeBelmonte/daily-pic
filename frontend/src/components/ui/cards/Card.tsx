import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
}

const Card = ({ 
  children,
  className,
}: Props) => {

  return (
     <div className={cn(`
      w-full max-w-[500px]
      justify-between
      p-2
      border-t border-b border-white/50
      rounded-[10px]`,
      className
    )}> 
      {children}
    </div>
  );
}

export default Card;