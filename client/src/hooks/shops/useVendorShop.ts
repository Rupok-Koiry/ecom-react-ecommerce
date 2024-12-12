import { useQuery } from "@tanstack/react-query";
import { getVendorShop } from "../../services/apiShops";
import { useSearchParams } from "react-router-dom";

export function useVendorShop() {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);
  const {
    isLoading,
    data: shop,
    error,
  } = useQuery({
    queryKey: ["allShops", queryParams],
    queryFn: () => getVendorShop(queryParams),
    retry: false,
  });

  return { isLoading, shop, error };
}
