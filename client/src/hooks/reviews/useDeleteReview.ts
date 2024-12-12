import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview as deleteReviewApi } from "../../services/apiReview";
import toast from "react-hot-toast";

export function useDeleteReview() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteReview,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendorReview"] });
      toast.success("Review deleted successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { deleteReview, isPending, error };
}
