import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import type { User } from "@daily-pic/shared/types";

import { Image, Card } from "@/components";

import { cn } from "@/utils/cn";

type Props = {
  user: User;
  read?: boolean;
  postImage: string;
}

const PostLikedCard = ({ 
  user,
  read,
  postImage
}: Props) => {

  return (
    <Card className={cn(
      !read && "border-t borlder-b border-red-400 cursor-pointer"
    )}>
        <div className="
          flex items-center 
          gap-2
          mb-2
        ">
          <Image 
            src={user.profileImageUrl}
            className="w-[40px] h-[40px] rounded-[7px]"
          />

          <p className="text-[.85rem] text-white">
            <Link
              to={`/profile/${user.username}`}
              className="text-[1.05rem] text-blue-500 cursor-pointer"
            >
              @{user.username}
            </Link> 
            {" indicó que le gusta tu publicación"}
          </p>

          <Heart 
            className="fill-red-500 stroke-red-500"
          />
        </div>

        <Image 
          src={postImage}
          className="w-full max-w-[300px] mx-auto"
        />
      
    </Card>
  );
}

export default PostLikedCard;