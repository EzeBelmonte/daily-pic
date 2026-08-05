import { cn } from "@/utils/cn";

type Props = {
  message: string | null;
  className?: string;
};

export default function AlertError ({ 
  message,
  className,
}: Props) {
  if (!message) return null;

  return (
    <div className={cn(
      "mt-10",
      className
    )}>
      <p className="text-white text-center">
        {message}
      </p>
    </div>
  );
}
