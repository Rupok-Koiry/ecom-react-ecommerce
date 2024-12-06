import { useQuery } from "@tanstack/react-query";
import { getProductReviews } from "../../services/apiProduct";

export function useProductReviews(productId: string) {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["productReviews", productId],
    queryFn: () => getProductReviews(productId),
    retry: false,
  });

  return { isLoading, reviews, error };
}
