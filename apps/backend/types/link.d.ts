type ILink = {
  id: string;
  image: string;
  title: string;
  author: IAuthor;
  createdAt: string;
  commentCount?: number;
  votesCount?: number;
  userVote?: IVote | null;
};
