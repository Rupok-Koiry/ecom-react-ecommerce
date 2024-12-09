import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../../services/apiOrder";

export function useOrderDetails(orderId: string) {
  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: () => getOrderDetails(orderId),
    retry: false,
  });

  return { isLoading, order, error };
}
