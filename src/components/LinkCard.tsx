import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/utils/common";
import { useState } from "react";
import { Button } from "./ui/button";
import { Votes } from "./Votes";
import { CommentList } from "./CommentList";
import { useCommentCreate, useVoteCreate } from "@/hooks";
import { useModal } from "@/contexts";

export type LinkCardProps = {
  link: ILink;
};

export function LinkCard({ link }: LinkCardProps) {
  const { mutateAsync: onComment } = useCommentCreate({
    linkId: link.id,
    parentId: null,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const { openModal, closeModal } = useModal();

  const onAddComment = () => {
    openModal("CommentModal", {
      onClose: closeModal,
      onSubmit: ({ text }) => {
        return onComment({
          linkId: link.id,
          parentId: null,
          text,
        });
      },
    });
  };

  const { mutateAsync: onVote } = useVoteCreate({
    linkId: link.id,
    parentId: null,
  });

  return (
    <Card className="w-full mx-auto">
      <CardContent className="p-4 flex items-start space-x-4">
        <Votes
          onVote={onVote}
          count={link.votesCount}
          vote={link.userVote}
          linkId={link.id}
        />

        <div className="flex-shrink-0">
          <img
            src={link.image}
            alt=""
            className="w-32 h-20 object-cover rounded"
          />
        </div>
        <div className="flex-grow flex flex-col min-w-0">
          <h2 className="text-lg font-semibold text-blue-600 mb-1 truncate">
            {link.title}
          </h2>
          <p className="text-sm text-gray-500 mb-1">
            Submitted {formatDate(link.createdAt)} by{" "}
            <span className="text-blue-800">{link.author.username}</span>
          </p>

          {!!link.commentCount && (
            <div className="mt-2">
              <div className="flex gap-2 items-center">
                <Button
                  variant="link"
                  size="sm"
                  onClick={toggleExpanded}
                  className="p-0 text-sm font-bold text-gray-500 hover:text-gray-500/50"
                >
                  {isExpanded
                    ? `Hide Comments (${link.commentCount})`
                    : `${link.commentCount} comments`}
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
                  linkId={link.id}
                  parentId={null}
                />
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
