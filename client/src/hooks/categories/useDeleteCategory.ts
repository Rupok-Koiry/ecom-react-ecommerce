import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../services/apiCategory";
import toast from "react-hot-toast";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteMutation, isPending, error };
}
