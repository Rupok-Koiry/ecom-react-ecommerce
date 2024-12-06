import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar as updateCarApi } from "../../services/apiCars";
import toast from "react-hot-toast";

export function useUpdateCar() {
  const queryClient = useQueryClient();

  const {
    mutate: updateCar,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateCarApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
      toast.success("Car updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateCar, isUpdating, error };
}
