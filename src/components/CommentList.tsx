import { useComments } from "@/hooks";
import { InfiniteScroll } from "./InfiniteScroll";
import { useMemo } from "react";
import { CommentCard } from "./CommentCard";

type CommentListProps = {
  enabled: boolean;
  linkId: IComment["linkId"];
  parentId: IComment["parentId"];
};

export function CommentList({ enabled, linkId, parentId }: CommentListProps) {
  const { data, isFetching, isRefetching, hasNextPage, fetchNextPage } =
    useComments(
      {
        enabled,
      },
      { linkId, parentId }
    );

  const comments = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data?.pages]
  );

  return (
    <InfiniteScroll
      isLoading={isFetching && !isRefetching}
      hasMore={hasNextPage}
      onLoadMore={fetchNextPage}
      variant="click"
    >
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </InfiniteScroll>
  );
}
