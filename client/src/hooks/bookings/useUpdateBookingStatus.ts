import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingStatus as updateBookingStatusApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  const {
    mutate: updateBookingStatus,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateBookingStatusApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userBookings"],
      });

      toast.success("Booking status updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateBookingStatus, isPending, error };
}
