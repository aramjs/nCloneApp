import { useAuth } from "@/contexts";
import { fetchList } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";

export const usePaginatedLinks = (page: number, sorting: SortingState) => {
  const { username } = useAuth();

  return useQuery<IPage<ILink>>({
    queryFn: () => fetchList("links", page, username, sorting),
    queryKey: ["links", { page, sorting }],
  });
};
