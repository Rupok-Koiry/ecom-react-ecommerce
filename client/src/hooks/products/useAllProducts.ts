import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/apiProduct";
import { useSearchParams } from "react-router-dom";

export function useAllProducts() {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);

  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => getAllProducts(queryParams),

    retry: false,
  });

  return { isLoading, products, error };
}
