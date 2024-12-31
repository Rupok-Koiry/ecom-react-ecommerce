import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNewsletter } from "../../services/apiNewsletter";
import toast from "react-hot-toast";

export function useDeleteNewsletter() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteNewsletter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletters"] });
      toast.success("Newsletter deleted successfully");
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return { deleteMutation, isPending, error };
}
