import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShop } from "../../services/apiShops";
import toast from "react-hot-toast";

export function useDeleteShop() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteShop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allShops"] });
      toast.success("Shop deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteMutation, isPending, error };
}
