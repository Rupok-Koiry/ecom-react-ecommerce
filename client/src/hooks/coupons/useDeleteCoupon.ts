import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCoupon } from "../../services/apiCoupon";
import toast from "react-hot-toast";

export function useDeleteCoupon() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("Coupon deleted successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { deleteMutation, isPending, error };
}
