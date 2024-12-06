import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../services/apiProduct";
import toast from "react-hot-toast";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: create,
    isPending,
    error,
  } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { create, isPending, error };
}
