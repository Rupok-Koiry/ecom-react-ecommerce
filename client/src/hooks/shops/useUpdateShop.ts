import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShop } from "../../services/apiShops";
import toast from "react-hot-toast";

export function useUpdateShop() {
  const queryClient = useQueryClient();

  const {
    mutate: update,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateShop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopDetails"] });
      toast.success("Shop updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { update, isPending, error };
}
