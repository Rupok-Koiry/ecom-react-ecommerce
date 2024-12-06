import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateMe() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateUser, isUpdating };
}
