import { formatDate } from "@/utils/common";
import { useState } from "react";
import { Button } from "./ui/button";
import { Votes } from "./Votes";
import { CommentList } from "./CommentList";
import { useCommentCreate, useVoteCreate } from "@/hooks";
import { useModal } from "@/contexts";

export type CommentCardProps = {
  comment: IComment;
};

export function CommentCard({ comment }: CommentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const params = { linkId: comment.linkId, parentId: comment.id };

  const { mutateAsync: onVote } = useVoteCreate({
    linkId: comment.linkId,
    parentId: comment.parentId,
  });

  const { mutateAsync: onComment } = useCommentCreate(params);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const { openModal, closeModal } = useModal();

  const onAddComment = () => {
    openModal("CommentModal", {
      onClose: closeModal,
      onSubmit: ({ text }) => onComment({ ...params, text }),
    });
  };

  return (
    <div className="flex items-start space-x-4 bg-white rounded-lg">
      <Votes
        count={comment.votesCount}
        vote={comment.userVote}
        commentId={comment.id}
        onVote={onVote}
      />

      <div className="flex-1">
        <p className="text-gray-800 mb-2">{comment.text}</p>
        <div className="text-sm text-gray-500">
          Submitted {formatDate(comment.createdAt)} by{" "}
          <span className="text-blue-800">{comment.author.username}</span>
        </div>
        {!!comment.commentCount && (
          <div className="mt-2">
            <div className="flex gap-2 items-center">
              <Button
                variant="link"
                size="sm"
                onClick={toggleExpanded}
                className="p-0 text-sm font-bold text-gray-500 hover:text-gray-500/50"
              >
                {isExpanded
                  ? `Hide Replies (${comment.commentCount})`
                  : `${comment.commentCount} replies`}
              </Button>

              <Button
                variant="link"
                size="sm"
                className="p-0 text-sm font-bold text-blue-500 hover:text-blue-500/50"
                onClick={onAddComment}
              >
                Add comment
              </Button>
            </div>
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
