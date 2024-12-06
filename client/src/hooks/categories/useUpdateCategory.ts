import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../services/apiCategory";
import toast from "react-hot-toast";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const {
    mutate: update,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { update, isPending, error };
}
