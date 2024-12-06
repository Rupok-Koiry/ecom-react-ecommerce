import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../services/apiCategory";
import toast from "react-hot-toast";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const {
    mutate: create,
    isPending,
    error,
  } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { create, isPending, error };
}
