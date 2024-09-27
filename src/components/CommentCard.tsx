import { formatDate } from "@/utils/common";
import { useState } from "react";
import { Button } from "./ui/button";
import { Votes } from "./Votes";
import { CommentList } from "./CommentList";

export type CommentCardProps = {
  comment: IComment;
};

export function CommentCard({ comment }: CommentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="flex items-start space-x-4 bg-white rounded-lg">
      <Votes
        count={comment.votesCount}
        vote={comment.userVote}
        commentId={comment.id}
      />

      <div className="flex-1">
        <p className="text-gray-800 mb-2">{comment.text}</p>
        <div className="text-sm text-gray-500">
          Submitted {formatDate(comment.createdAt)} by{" "}
          <span className="text-blue-800">{comment.author.username}</span>
        </div>
        {!!comment.commentCount && (
          <div className="mt-2">
            <Button
              variant="link"
              size="sm"
              onClick={toggleExpanded}
              className="p-0 text-sm font-bold text-gray-500 hover:text-gray-500/50"
            >
              {isExpanded ? "Hide Replies" : `${comment.commentCount} replies`}
            </Button>
            {isExpanded && (
              <CommentList
                enabled={isExpanded}
                linkId={comment.linkId}
                parentId={comment.id}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
