import { useQuery } from "@tanstack/react-query";
import { getVendorOrders } from "../../services/apiOrder";

export function useVendorOrders(shopId: string) {
  const {
    isLoading,
    data: vendorOrders,
    error,
  } = useQuery({
    queryKey: ["vendorOrders", shopId],
    queryFn: () => getVendorOrders(shopId),
    retry: false,
  });

  return { isLoading, vendorOrders, error };
}
