import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollowShop } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useUnfollowShop() {
  const queryClient = useQueryClient();

  const {
    mutate: unfollow,
    isPending,
    error,
  } = useMutation({
    mutationFn: unfollowShop,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["shopDetails"],
      });

      toast.success("Shop unfollowed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { unfollow, isPending, error };
}
