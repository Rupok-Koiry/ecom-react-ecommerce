import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../../services/apiTransaction";
import toast from "react-hot-toast";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  const {
    mutate: create,
    isPending,
    error,
  } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction created successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { create, isPending, error };
}
