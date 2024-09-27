import { getMutationFn } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLinkUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getMutationFn<ILink, ILinkUpdateInput>("links", "update"),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["links"], exact: true });
    },
  });
}
