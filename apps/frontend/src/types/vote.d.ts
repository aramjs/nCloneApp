type IVote = {
  id: string;
  username: string;
  linkId?: string;
  commentId?: string;
  type: "up" | "down" | null;
};

type IVoteCreateInput = {
  type: IVote["type"];
  linkId?: string;
  commentId?: string;
};
