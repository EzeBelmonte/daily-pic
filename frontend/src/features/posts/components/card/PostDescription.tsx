type Props = {
  description?: string;
  className?: string;
}

const PostDescription = ({ 
  description = "",
  className,
}: Props) => {

  return (
    <div className={className}>
      <p className="text-white text-[.95rem]">
        {description}
      </p>
    </div>
  );
}

export default PostDescription;