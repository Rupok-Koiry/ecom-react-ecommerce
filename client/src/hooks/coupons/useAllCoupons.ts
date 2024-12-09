import { useQuery } from "@tanstack/react-query";
import { getAllCoupons } from "../../services/apiCoupon";

export function useAllCoupons() {
  const {
    isLoading,
    data: coupons,
    error,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: getAllCoupons,
    retry: false,
  });

  return { isLoading, coupons, error };
}
