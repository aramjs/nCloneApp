import { useAuth } from "@/contexts";
import { fetchList, FetchListParams } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const usePaginatedLinks = (params: FetchListParams) => {
  const { username } = useAuth();

  return useQuery<IPage<ILink>>({
    queryFn: () => fetchList("links", username, params),
    queryKey: ["links", params],
  });
};
