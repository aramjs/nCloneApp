import { getURL } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export function useLinks() {
  return useQuery({
    queryKey: ["links"],
    queryFn: () => fetch(getURL("/links")).then((res) => res.json()),
  });
}
