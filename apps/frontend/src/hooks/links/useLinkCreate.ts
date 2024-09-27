import { useAuth } from "@/contexts";
import { FetchListParams, getMutationFn } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLinkCreate(params: FetchListParams) {
  const { username } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getMutationFn<ILink, ILinkCreateInput>("links", username),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["links", params] });
    },
  });
}
