import { useAuth } from "@/contexts";
import { getCreateFn } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  linkId: string | null;
  parentId: string | null;
};

export function useVoteCreate(props: Props) {
  const { username } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getCreateFn<IVote, IVoteCreateInput>("votes", username),
    onSuccess: async (_data, variables) => {
      const getQueryKey = () => {
        if (variables.linkId) return ["links"];
        if (variables.commentId) return ["comments", props];
      };

      const queryKey = getQueryKey();

      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey });
        await queryClient.refetchQueries({ queryKey, exact: true });
      }
    },
  });
}
