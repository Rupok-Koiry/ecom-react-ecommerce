import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blacklistShop } from "../../services/apiShops";
import toast from "react-hot-toast";

export function useBlacklistShop() {
  const queryClient = useQueryClient();

  const {
    mutate: blacklist,
    isPending,
    error,
  } = useMutation({
    mutationFn: blacklistShop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allShops"] });
      toast.success("Shop blacklisted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { blacklist, isPending, error };
}
