import { getFetchInfiniteList } from "@/utils/api";
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";

export const useInfiniteLinks = (options?: InfiniteQueryOptions<ILink>) => {
  return useInfiniteQuery<
    IPage<ILink>,
    Error,
    InfiniteData<IPage<ILink>>,
    QueryKey
  >({
    queryKey: ["links"],
    // @ts-expect-error there are mismatched types in the package
    queryFn: getFetchInfiniteList<ILink>("links"),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.currentPage + 1;

      return nextPage > lastPage.totalPages ? undefined : nextPage;
    },
    ...options,
  });
};
