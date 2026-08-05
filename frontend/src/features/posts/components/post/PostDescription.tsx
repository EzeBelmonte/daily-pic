import { cn } from "@/utils/cn";

type Props = {
  description?: string;
  className?: string;
}

const PostDescription = ({ 
  description = "",
  className,
}: Props) => {

  return (
    <div className={cn(
      "w-full max-w-[450px] mx-auto",
      className
    )}>
      <p className="text-white text-[.95rem] ">
        {description}
      </p>
    </div>
  );
}

export default PostDescription;