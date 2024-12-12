import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../../services/apiReview";
import toast from "react-hot-toast";

export function useCreateReview() {
  const queryClient = useQueryClient();

  const {
    mutate: create,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({
      productId,
      reviewData,
    }: {
      productId: string;
      reviewData: { rating: number; comment?: string };
    }) => createReview(productId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["productReviews"] });

      toast.success("Review created successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { create, isPending, error };
}
