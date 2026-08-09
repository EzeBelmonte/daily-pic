import { Button } from "@/components";
import { cn } from "@/utils/cn";

type Props = {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

const NotificationsNavButton = ({
  active,
  children,
  onClick,
}: Props) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "flex-1",
        active ? "text-blue-500" : "text-white"
      )}
    >
      {children}
    </Button>
  );
};

export default NotificationsNavButton;