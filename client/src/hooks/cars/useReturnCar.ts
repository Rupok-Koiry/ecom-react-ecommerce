import { useMutation, useQueryClient } from "@tanstack/react-query";
import { returnCar as returnCarApi } from "../../services/apiCars";
import toast from "react-hot-toast";

export function useReturnCar() {
  const queryClient = useQueryClient();

  const {
    mutate: returnCar,
    isPending,
    error,
  } = useMutation({
    mutationFn: returnCarApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Car returned successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { returnCar, isPending, error };
}
