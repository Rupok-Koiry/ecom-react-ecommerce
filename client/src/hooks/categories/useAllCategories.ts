import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/apiCategory";

export function useAllCategories() {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    retry: false,
  });

  return { isLoading, categories, error };
}
