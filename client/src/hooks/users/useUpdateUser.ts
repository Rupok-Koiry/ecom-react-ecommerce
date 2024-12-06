import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateUser, isUpdating, error };
}
