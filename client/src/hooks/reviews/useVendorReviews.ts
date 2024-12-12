import { useQuery } from "@tanstack/react-query";
import { getVendorReviews } from "../../services/apiReview";

export function useVendorReviews() {
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["vendorReview"],
    queryFn: () => getVendorReviews(),
    retry: false,
  });

  return { isLoading, reviews, error };
}
