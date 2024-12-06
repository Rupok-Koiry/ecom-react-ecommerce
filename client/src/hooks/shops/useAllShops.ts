import { useQuery } from "@tanstack/react-query";
import { getAllShops } from "../../services/apiShops";
import { useSearchParams } from "react-router-dom";

export function useAllShops() {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);
  const {
    isLoading,
    data: shops,
    error,
  } = useQuery({
    queryKey: ["allShops", queryParams],
    queryFn: () => getAllShops(queryParams),
    retry: false,
  });

  return { isLoading, shops, error };
}
