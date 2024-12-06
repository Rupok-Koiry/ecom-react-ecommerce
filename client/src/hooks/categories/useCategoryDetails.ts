import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/apiCategory";

export function useCategoryDetails(categoryId: string) {
  const {
    isLoading,
    data: category,
    error,
  } = useQuery({
    queryKey: ["categoryDetails", categoryId],
    queryFn: () => getCategory(categoryId),
    retry: false,
  });

  return { isLoading, category, error };
}
