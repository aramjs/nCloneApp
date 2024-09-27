import { ArrowBigDown, ArrowBigUp } from "lucide-react";

export type VotesProps = {
  vote?: IVote;
  count: number;
  linkId?: string;
  commentId?: string;
  onVote(params: IVoteCreateInput): void;
};

export function Votes({ vote, count, linkId, commentId, onVote }: VotesProps) {
  const onVoteHandler = (type: IVoteCreateInput["type"]) => {
    return onVote({
      type: type === vote?.type ? null : type,
      ...(linkId && { linkId }),
      ...(commentId && { commentId }),
    });
  };

  return (
    <div className="flex flex-col items-center space-y-1 w-10 flex-shrink-0">
      <button
        className={`transition-colors ${
          vote?.type === "up"
            ? "text-orange-500"
            : "text-gray-400 hover:text-orange-500"
        }`}
        onClick={() => onVoteHandler("up")}
      >
        <ArrowBigUp
          className="h-6 w-6"
          fill={vote?.type === "up" ? "currentColor" : "none"}
        />
      </button>
      <span className="font-bold text-sm text-center">
        {count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count}
      </span>
      <button
        className={`transition-colors ${
          vote?.type === "down"
            ? "text-blue-500"
            : "text-gray-400 hover:text-blue-500"
        }`}
        onClick={() => onVoteHandler("down")}
      >
        <ArrowBigDown
          className="h-6 w-6"
          fill={vote?.type === "down" ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
}
