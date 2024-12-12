import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useResetPassword() {
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("Your password has been reset successfully.");
      navigate("/login");
    },
    onError: () => {
      toast.error("Token is invalid or has expired. Please try again.");
    },
  });

  return { resetPassword, isPending };
}
