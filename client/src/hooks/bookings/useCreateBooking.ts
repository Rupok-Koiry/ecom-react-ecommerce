import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const {
    mutate: createBooking,
    isPending,
    error,
  } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Booking created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createBooking, isPending, error };
}
