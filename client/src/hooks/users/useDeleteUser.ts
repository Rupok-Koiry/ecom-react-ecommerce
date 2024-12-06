import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteUserMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      });
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteUserMutation, isPending, error };
}
