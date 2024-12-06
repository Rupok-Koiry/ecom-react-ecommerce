import { useMutation, useQueryClient } from "@tanstack/react-query";
import { banUser } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useBanUser() {
  const queryClient = useQueryClient();

  const {
    mutate: ban,
    isPending,
    error,
  } = useMutation({
    mutationFn: banUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      });
      toast.success("User banned successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { ban, isPending, error };
}
