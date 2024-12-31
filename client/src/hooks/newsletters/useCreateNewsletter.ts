import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewsletter } from "../../services/apiNewsletter";
import toast from "react-hot-toast";

export function useCreateNewsletter() {
  const queryClient = useQueryClient();

  const {
    mutate: create,
    isPending,
    error,
  } = useMutation({
    mutationFn: createNewsletter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletters"] });
      toast.success("Newsletter created successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { create, isPending, error };
}
