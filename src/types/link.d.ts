type ILink = {
  id: string;
  image: string;
  title: string;
  author: IAuthor;
  createdAt: string;
  commentCount: number;
  votesCount: number;
  userVote?: IVote;
};

type ILinkCreateInput = {
  image: string;
  title: string;
};

type ILinkUpdateInput = { id: string } & Partial<{
  image: string;
  title: string;
}>;
