import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCoupon } from "../../services/apiCoupon";
import toast from "react-hot-toast";

export function useUpdateCoupon() {
  const queryClient = useQueryClient();

  const {
    mutate: update,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      queryClient.invalidateQueries({ queryKey: ["couponDetails"] });
      toast.success("Coupon updated successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { update, isPending, error };
}
