import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useForgotPassword() {
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: () => {
      toast.success("Password reset email sent. Please check your inbox.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { forgotPassword, isPending };
}
