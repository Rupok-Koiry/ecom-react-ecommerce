import { useQuery } from "@tanstack/react-query";
import { getUserBookings } from "../../services/apiBookings";

export function useUserBookings() {
  const {
    isLoading,
    data: userBookings,
    error,
  } = useQuery({
    queryKey: ["userBookings"],
    queryFn: getUserBookings,
    retry: false,
  });

  return { isLoading, userBookings, error };
}
