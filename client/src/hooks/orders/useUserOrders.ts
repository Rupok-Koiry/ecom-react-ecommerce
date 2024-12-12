import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../../services/apiOrder";

export function useUserOrders(page = 1, limit = 5) {
  const {
    isLoading,
    data: { orders = [], totalOrders = 0 } = {},
    error,
  } = useQuery({
    queryKey: ["userOrders", page, limit],
    queryFn: () => getUserOrders(page, limit),
  });

  return { isLoading, orders, totalOrders, error };
}
