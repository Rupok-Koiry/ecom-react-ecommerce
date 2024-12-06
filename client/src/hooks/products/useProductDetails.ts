import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../../services/apiProduct";

export function useProductDetails(productId: string) {
  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["productDetails", productId],
    queryFn: () => getProductDetails(productId),
    retry: false,
  });

  return { isLoading, product, error };
}
