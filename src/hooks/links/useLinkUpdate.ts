import { useAuth } from "@/contexts";
import { getMutationFn } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLinkUpdate() {
  const { username } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getMutationFn<ILink, ILinkUpdateInput>(
      "links",
      username,
      "update"
    ),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["links"], exact: true });
    },
  });
}
