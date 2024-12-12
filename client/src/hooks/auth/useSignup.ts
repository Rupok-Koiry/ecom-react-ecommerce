import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["userProfile"], user);
      toast.success("Signup successful");
      if (user.role === "vendor") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isPending };
}
