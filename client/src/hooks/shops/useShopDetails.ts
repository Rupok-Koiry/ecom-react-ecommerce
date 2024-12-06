import { useQuery } from "@tanstack/react-query";
import { getShopDetails } from "../../services/apiShops";

export function useShopDetails(shopId: string) {
  const {
    isLoading,
    data: shop,
    error,
  } = useQuery({
    queryKey: ["shopDetails", shopId],
    queryFn: () => getShopDetails(shopId),
    retry: false,
  });

  return { isLoading, shop, error };
}
