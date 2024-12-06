import { useQuery } from "@tanstack/react-query";
import { getShopProducts } from "../../services/apiShops";

export function useShopProducts(
  shopId: string,
  queryParams?: Record<string, any>
) {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["shopProducts", shopId, queryParams],
    queryFn: () => getShopProducts(shopId, queryParams),
    retry: false,
  });

  return { isLoading, products, error };
}
