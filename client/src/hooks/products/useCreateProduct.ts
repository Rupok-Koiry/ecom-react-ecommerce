import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct as createProductApi } from "../../services/apiProduct";
import toast from "react-hot-toast";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: createProduct,
    isPending,
    error,
  } = useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { createProduct, isPending, error };
}
