import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/apiProduct";

export function useAllProducts(filters?: any) {
  const {
    isLoading,
    data: { doc: products = [], totalCounts: totalProducts = 0 } = {},
    error,
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getAllProducts(filters),

    retry: false,
  });

  return { isLoading, products, totalProducts, error };
}
