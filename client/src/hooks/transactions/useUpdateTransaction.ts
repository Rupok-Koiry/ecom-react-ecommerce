import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransaction } from "../../services/apiTransaction";
import toast from "react-hot-toast";

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  const {
    mutate: update,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transaction"],
      });
      toast.success("Transaction updated successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { update, isPending, error };
}
