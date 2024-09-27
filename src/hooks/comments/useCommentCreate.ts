import { useAuth } from "@/contexts";
import { getCreateFn } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CommentFilters = Pick<IComment, "linkId" | "parentId">;

export function useCommentCreate(filters: CommentFilters) {
  const { username } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getCreateFn<IComment, ICommentCreateInput>(
      "comments",
      username
    ),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", filters],
      });

      await queryClient.refetchQueries({
        queryKey: ["comments", filters],
        exact: true,
      });

      if (variables.linkId && !variables.parentId) {
        await queryClient.invalidateQueries({
          queryKey: ["links"],
        });

        await queryClient.refetchQueries({
          queryKey: ["links"],
          exact: true,
        });
      }
    },
  });
}
