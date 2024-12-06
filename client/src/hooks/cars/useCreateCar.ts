import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCar as createCarApi } from "../../services/apiCars";
import toast from "react-hot-toast";

export function useCreateCar() {
  const queryClient = useQueryClient();

  const {
    mutate: createCar,
    isPending,
    error,
  } = useMutation({
    mutationFn: createCarApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
      toast.success("Car created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createCar, isPending, error };
}
