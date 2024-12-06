import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/apiCategory";
import { useSearchParams } from "react-router-dom";

export function useAllCategories() {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["categories", queryParams],
    queryFn: () => getAllCategories(queryParams),
    retry: false,
  });

  return { isLoading, categories, error };
}
