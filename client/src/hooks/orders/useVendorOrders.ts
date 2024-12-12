import { useQuery } from "@tanstack/react-query";
import { getVendorOrders } from "../../services/apiOrder";

export function useVendorOrders(shopId: string, page = 1, limit = 10) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["vendorOrders", shopId, page, limit],
    queryFn: () => getVendorOrders(shopId, page, limit),
    retry: false,
  });

  const orders = data?.orders;
  const totalOrders = data?.totalOrders;

  return { isLoading, orders, totalOrders, error };
}
