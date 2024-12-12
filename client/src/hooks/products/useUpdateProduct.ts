import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct as updateProductApi } from "../../services/apiProduct";
import toast from "react-hot-toast";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: updateProduct,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
      toast.success("Product updated successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { updateProduct, isPending, error };
}
