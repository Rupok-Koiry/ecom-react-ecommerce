import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../services/apiOrder";

export function useAllOrders() {
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getAllOrders,
  });

  return { isLoading, orders, error };
}
