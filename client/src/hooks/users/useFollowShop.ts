import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followShop } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useFollowShop() {
  const queryClient = useQueryClient();

  const {
    mutate: follow,
    isPending,
    error,
  } = useMutation({
    mutationFn: followShop,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["shopDetails"],
      });

      toast.success("Shop followed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { follow, isPending, error };
}
