import { getFetchInfiniteList } from "@/utils/api";
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";

type CommentFilters = Pick<IComment, "linkId" | "parentId">;

export const useComments = (
  options?: InfiniteQueryOptions<IComment>,
  filters?: CommentFilters
) => {
  return useInfiniteQuery<
    IPage<IComment>,
    Error,
    InfiniteData<IPage<IComment>>,
    QueryKey
  >({
    queryKey: ["comments", filters],
    // @ts-expect-error there are mismatched types in the package
    queryFn: getFetchInfiniteList<IComment>("comments", filters),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.currentPage + 1;

      return nextPage > lastPage.totalPages ? undefined : nextPage;
    },
    ...options,
  });
};
