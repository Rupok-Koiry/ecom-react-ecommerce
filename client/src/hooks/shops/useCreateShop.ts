import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShop } from "../../services/apiShops";
import toast from "react-hot-toast";

export function useCreateShop() {
  const queryClient = useQueryClient();

  const {
    mutate: create,
    isPending,
    error,
  } = useMutation({
    mutationFn: createShop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allShops"] });
      toast.success("Shop created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { create, isPending, error };
}
