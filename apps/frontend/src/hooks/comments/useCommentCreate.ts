import { getMutationFn } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CommentFilters = Pick<IComment, "linkId" | "parentId">[];

export function useCommentCreate(filters: CommentFilters) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getMutationFn<IComment, ICommentCreateInput>("comments"),
    onSuccess: async (_data, variables) => {
      await Promise.all(
        filters.map((filter) => {
          return queryClient.refetchQueries({
            queryKey: ["comments", filter],
          });
        })
      );

      if (variables.linkId && !variables.parentId) {
        await queryClient.refetchQueries({
          queryKey: ["links"],
          exact: true,
        });
      }
    },
  });
}
