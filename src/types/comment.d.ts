type IComment = {
  id: string;
  text: string;
  author: IAuthor;
  linkId: string | null;
  parentId: string | null;
  createdAt: string;
  commentCount: number;
  votesCount: number;
  userVote?: IVote;
};
