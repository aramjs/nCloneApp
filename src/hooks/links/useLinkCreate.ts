import { useAuth } from "@/contexts";
import { getMutationFn } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLinkCreate() {
  const { username } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getMutationFn<ILink, ILinkCreateInput>("links", username),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["links"], exact: true });
    },
  });
}
