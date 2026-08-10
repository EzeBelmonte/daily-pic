import type { PostLikeNotification } from "@daily-pic/shared/types";

import { useMarkNotificationAsRead } from "@/features/notifications/hooks/mutations/useMarkNotificationAsRead";

import PostLikedCard from "../cards/PostLikedCard";

type Props = {
  notification: PostLikeNotification;
};

const PostLikedNotification = ({
  notification
}: Props) => {

  const markAsReadMutation =
    useMarkNotificationAsRead();

  const handleNotification = () =>  {
    markAsReadMutation.mutate(notification.id);
  }

  return (

    <div
      className="w-full flex flex-col items-center"
      onClick={handleNotification}
    >
      
      <PostLikedCard
        user={notification.sender}
        postImage={notification.post.imageUrl}
        read={notification.read}
      />

    </div>
  );
}

export default PostLikedNotification;