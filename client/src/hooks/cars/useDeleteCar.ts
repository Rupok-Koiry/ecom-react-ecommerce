import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCar as deleteCarApi } from "../../services/apiCars";
import toast from "react-hot-toast";

export function useDeleteCar() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCar } = useMutation({
    mutationFn: deleteCarApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
      toast.success("Car deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteCar };
}
