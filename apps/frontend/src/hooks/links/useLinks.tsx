import { fetchList, FetchListParams } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const usePaginatedLinks = (params: FetchListParams) => {
  return useQuery<IPage<ILink>>({
    queryFn: () => fetchList("links", params),
    queryKey: ["links", params],
  });
};
