import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../services/apiProduct";
import toast from "react-hot-toast";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { deleteMutation, isPending, error };
}
