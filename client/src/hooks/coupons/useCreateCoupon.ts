import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCoupon } from "../../services/apiCoupon";
import toast from "react-hot-toast";

export function useCreateCoupon() {
  const queryClient = useQueryClient();

  const {
    mutate: create,
    isPending,
    error,
  } = useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("Coupon created successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { create, isPending, error };
}
