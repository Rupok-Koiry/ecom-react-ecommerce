import { useQuery } from "@tanstack/react-query";
import { getCouponDetails } from "../../services/apiCoupon";

export function useCouponDetails(couponId: string) {
  const {
    isLoading,
    data: coupon,
    error,
  } = useQuery({
    queryKey: ["couponDetails", couponId],
    queryFn: () => getCouponDetails(couponId),
    retry: false,
  });

  return { isLoading, coupon, error };
}
