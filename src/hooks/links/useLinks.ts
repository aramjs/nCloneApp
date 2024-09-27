import { useAuth } from "@/contexts";
import { getFetchList } from "@/utils/api";
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";

export const useLinks = (options?: InfiniteQueryOptions<ILink>) => {
  const { username } = useAuth();

  return useInfiniteQuery<
    IPage<ILink>,
    Error,
    InfiniteData<IPage<ILink>>,
    QueryKey
  >({
    queryKey: ["links"],
    // @ts-expect-error there are mismatched types in the package
    queryFn: getFetchList<ILink>("links", username),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.currentPage + 1;

      return nextPage > lastPage.totalPages ? undefined : nextPage;
    },
    ...options,
  });
};
