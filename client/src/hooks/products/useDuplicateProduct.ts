import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateProduct } from "../../services/apiProduct";
import toast from "react-hot-toast";

export function useDuplicateProduct() {
  const queryClient = useQueryClient();

  const {
    mutate: duplicate,
    isPending,
    error,
  } = useMutation({
    mutationFn: duplicateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product duplicated successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { duplicate, isPending, error };
}
