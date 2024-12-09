import { useQuery } from "@tanstack/react-query";
import { getReviewsForProduct } from "../../services/apiReview";

export function useProductReviews(productId: string) {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviewsForProduct(productId),
    retry: false,
  });

  return { isLoading, reviews, error };
}
