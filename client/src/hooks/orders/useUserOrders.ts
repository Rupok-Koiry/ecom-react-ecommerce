import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../../services/apiOrder";

export function useUserOrders() {
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrders,
    retry: false,
  });

  return { isLoading, orders, error };
}
