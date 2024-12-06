import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateUser, isPending, error };
}
