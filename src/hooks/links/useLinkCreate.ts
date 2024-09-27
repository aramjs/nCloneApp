import { useAuth } from "@/contexts";
import { getCreateFn } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLinkCreate() {
  const { username } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getCreateFn<ILink, ILinkCreateInput>("links", username),
    onSuccess: async () => {
      // Invalidate and refetch the 'links' queries
      await queryClient.invalidateQueries({ queryKey: ["links"] });
      // Optionally, you can refetch the queries if needed
      await queryClient.refetchQueries({ queryKey: ["links"], exact: true });
    },
  });
}
