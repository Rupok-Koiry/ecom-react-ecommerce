import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../../services/apiTransaction";
import toast from "react-hot-toast";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  const {
    mutate: remove,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction deleted successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { remove, isPending, error };
}
