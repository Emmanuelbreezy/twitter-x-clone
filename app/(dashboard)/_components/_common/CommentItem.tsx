import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CommentType } from "@/types/comment.type";
import { formatDistanceToNowStrict } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Badge from "@/components/badge";
import { Dot } from "lucide-react";

interface PropsType {
  comment: CommentType;
}
const CommentItem: React.FC<PropsType> = ({ comment }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      router.push(`/${comment?.user?.username}`);
    },
    [router, comment?.user?.username]
  );

  const createdAt = useMemo(() => {
    if (!comment.createdAt) {
      return null;
    }

    const timeDifference = formatDistanceToNowStrict(
      new Date(comment.createdAt),
      {}
    );

    const timeParts = timeDifference.split(" ");
    let formattedTime;

    if (timeParts[1].startsWith("second")) {
      formattedTime = `${timeParts[0]}s`;
    } else if (timeParts[1].startsWith("minute")) {
      formattedTime = `${timeParts[0]}min`;
    } else if (timeParts[1].startsWith("hour")) {
      formattedTime = `${timeParts[0]}h`;
    } else if (timeParts[1].startsWith("day")) {
      formattedTime = `${timeParts[0]}d`;
    } else {
      formattedTime = timeDifference;
    }

    return formattedTime;
  }, [comment.createdAt]);

  return (
    <article
      className="
      border-b-[1px]
      dark:border-[rgb(47,51,54)]
        p-5
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar role="button" onClick={goToUser}>
          <AvatarImage
            src={comment?.user?.profileImage || comment?.user?.image || ""}
            alt={comment?.user.username || ""}
            className="object-cover"
          />
          <AvatarFallback className="font-bold text-[60px]">
            {comment?.user?.name}
          </AvatarFallback>
        </Avatar>
        <div className="w-full">
          <div className="flex flex-row items-center gap-[4px]">
            <div className="flex flex-row gap-[2px]">
              <h5
                className="font-bold cursor-pointer hover:underline"
                role="button"
                onClick={goToUser}
              >
                {comment?.user?.name}
              </h5>
              {comment?.user.isVerified && comment?.user.plan === "PRO" && (
                <Badge />
              )}
            </div>
            <span
              className="!text-[#959fa8] text-sm inline-block truncate font-normal"
              role="button"
              onClick={goToUser}
            >
              @{comment?.user?.username}
            </span>
            <div className="flex items-center">
              <span className="!text-[#959fa8] text-sm">
                <Dot size="15px" />
              </span>
              <span className="!text-[#959fa8] text-sm">{createdAt}</span>
            </div>
          </div>

          <div className="mt-1">
            <div dangerouslySetInnerHTML={{ __html: comment.body }} />
          </div>
          {comment?.commentImage && (
            <div className="relative w-full my-3 h-80 overflow-hidden rounded-md bg-[#eee] dark:bg-gray-600">
              <Image
                fill
                src={comment?.commentImage || ""}
                alt={comment?.user?.username || ""}
                loading="lazy"
                className="object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default CommentItem;
