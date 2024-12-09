import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../services/apiReview";
import toast from "react-hot-toast";

export function useDeleteReview() {
  const queryClient = useQueryClient();

  const {
    mutate: remove,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review deleted successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { remove, isPending, error };
}
