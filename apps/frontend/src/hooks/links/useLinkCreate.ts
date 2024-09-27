import { FetchListParams, getMutationFn } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLinkCreate(params?: FetchListParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getMutationFn<ILink, ILinkCreateInput>("links"),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["links", params].filter(Boolean),
      });
    },
  });
}
