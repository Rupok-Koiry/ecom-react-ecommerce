import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeOrder } from "../../services/apiOrder";
import toast from "react-hot-toast";

export function usePlaceOrder() {
  const queryClient = useQueryClient();

  const {
    mutate: place,
    isPending,
    error,
  } = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order placed successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { place, isPending, error };
}
