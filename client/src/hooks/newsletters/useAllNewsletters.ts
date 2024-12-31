import { useQuery } from "@tanstack/react-query";
import { getAllNewsletters } from "../../services/apiNewsletter";

export function useAllNewsletters() {
  const {
    isLoading,
    data: newsletters,
    error,
  } = useQuery({
    queryKey: ["newsletters"],
    queryFn: getAllNewsletters,
    retry: false,
  });

  return { isLoading, newsletters, error };
}
