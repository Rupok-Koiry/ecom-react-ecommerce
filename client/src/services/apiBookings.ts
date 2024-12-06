import { BookingStatusTypes, BookingTypes } from "../constants/types";
import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";
export async function getUserBookings() {
  const response = await handleApiRequest(api.get(`/bookings/my-bookings`));
  return response.data.data;
}

export async function getAllBookings() {
  const response = await handleApiRequest(api.get(`/bookings`));
  return response.data.data;
}

export async function createBooking(newBooking: Omit<BookingTypes, "_id">) {
  const response = await handleApiRequest(api.post(`/bookings`, newBooking));
  return response.data.data;
}

export async function updateBookingStatus({
  status,
  bookingId,
}: {
  status: BookingStatusTypes;
  bookingId: string;
}) {
  const response = await handleApiRequest(
    api.patch(`/bookings/${bookingId}`, { status })
  );
  return response.data.data;
}
