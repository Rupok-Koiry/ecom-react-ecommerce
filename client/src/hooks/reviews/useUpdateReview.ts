import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "../../services/apiReview";
import toast from "react-hot-toast";

export function useUpdateReview() {
  const queryClient = useQueryClient();

  const {
    mutate: update,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review updated successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { update, isPending, error };
}
