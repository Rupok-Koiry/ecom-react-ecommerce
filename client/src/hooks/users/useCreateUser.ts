import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser as createUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: createUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createUser, isPending, error };
}
