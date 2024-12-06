import { useQuery } from "@tanstack/react-query";
import { getCars } from "../../services/apiCars";
import { useParams } from "react-router-dom";

export function useCar() {
  const { carId } = useParams();

  const {
    isLoading,
    data: car,
    error,
  } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => getCars(carId as string),
    retry: false,
  });

  return { isLoading, car, error };
}
