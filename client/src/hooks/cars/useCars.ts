import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getAllCars } from "../../services/apiCars";
import { CarFiltersTypes } from "../../constants/types";

export function useCars() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const filters: CarFiltersTypes = {
    search: searchParams.get("search"),
    type: searchParams.get("type"),
    price: searchParams.get("price"),
    status: searchParams.get("status"),
    features: searchParams.get("features"),
  };

  const {
    isLoading,
    data: cars,
    error,
  } = useQuery({
    queryKey: ["cars", filters],
    queryFn: () => getAllCars(filters),
    retry: false,
  });

  return { isLoading, cars, error };
}
