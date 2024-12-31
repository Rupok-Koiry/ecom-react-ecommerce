import { useQuery } from "@tanstack/react-query";
import { getNewsletterDetails } from "../../services/apiNewsletter";

export function useNewsletterDetails(newsletterId: string) {
  const {
    isLoading,
    data: coupon,
    error,
  } = useQuery({
    queryKey: ["newsletterDetails", newsletterId],
    queryFn: () => getNewsletterDetails(newsletterId),
    retry: false,
  });

  return { isLoading, coupon, error };
}
