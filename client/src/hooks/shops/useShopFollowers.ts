import { useQuery } from "@tanstack/react-query";
import { getShopFollowers } from "../../services/apiShops";

export function useShopFollowers(shopId: string) {
  const {
    isLoading,
    data: followers,
    error,
  } = useQuery({
    queryKey: ["shopFollowers", shopId],
    queryFn: () => getShopFollowers(shopId),
    retry: false,
  });

  return { isLoading, followers, error };
}
