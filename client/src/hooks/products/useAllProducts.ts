import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/apiProduct";
import { useSearchParams } from "react-router-dom";

export function useAllProducts(filters: any) {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getAllProducts(filters),

    retry: false,
  });

  return { isLoading, products, error };
}
