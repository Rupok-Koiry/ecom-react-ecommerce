import { useQuery } from "@tanstack/react-query";
import { getAllShops } from "../../services/apiShops";

export function useAllShops() {
  const {
    isLoading,
    data: shops,
    error,
  } = useQuery({
    queryKey: ["allShops"],
    queryFn: getAllShops,
    retry: false,
  });

  return { isLoading, shops, error };
}
