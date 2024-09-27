import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/utils/common";
import { useState } from "react";
import { Button } from "./ui/button";
import { Votes } from "./Votes";
import { CommentList } from "./CommentList";

export type LinkCardProps = {
  link: ILink;
};

export function LinkCard({ link }: LinkCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <Card className="w-full mx-auto">
      <CardContent className="p-4 flex items-start space-x-4">
        <Votes count={link.votesCount} vote={link.userVote} linkId={link.id} />

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
            <div>
              <Button
                variant="link"
                size="sm"
                onClick={toggleExpanded}
                className="p-0 text-sm font-bold text-gray-500 hover:text-gray-500/50"
              >
                {isExpanded ? "Hide Comments" : `${link.commentCount} comments`}
              </Button>

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
