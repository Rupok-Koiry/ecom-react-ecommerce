import React from "react";
import Button from "../components/Button";
import {
  BookingStatusTypes,
  BookingTypes,
  CarTypes,
  UserTypes,
} from "../constants/types";
import { useMe } from "../hooks/auth/useMe";
import { useBookings } from "../hooks/bookings/useBookings";
import { useUpdateBookingStatus } from "../hooks/bookings/useUpdateBookingStatus";
import { useUserBookings } from "../hooks/bookings/useUserBookings";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

const STATUS_COLORS: Record<BookingStatusTypes, string> = {
  pending: "bg-primary-orange",
  approved: "bg-primary-green",
  cancelled: "bg-primary-red",
  completed: "bg-primary-blue",
};

type BookingTableProps = {
  showAction?: boolean;
};

const BookingTable: React.FC<BookingTableProps> = ({ showAction = true }) => {
  const {
    userBookings,
    isLoading: isUserBookingsLoading,
    error: userBookingError,
  } = useUserBookings();
  const {
    bookings,
    isLoading: isBookingLoading,
    error: bookigError,
  } = useBookings();
  const { user } = useMe();
  const { updateBookingStatus, isPending } = useUpdateBookingStatus();

  const bookingsToShow = user?.role === "admin" ? bookings : userBookings;
  const isLoading =
    user?.role === "admin" ? isBookingLoading : isUserBookingsLoading;
  const error = user?.role === "admin" ? bookigError : userBookingError;

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;

  if (!bookingsToShow.length)
    return <ErrorMessage message={"No Bookings Found"} />;

  const handleStatusUpdate = (
    bookingId: string,
    status: BookingStatusTypes
  ) => {
    updateBookingStatus({ status, bookingId });
  };

  return (
    <div className="shadow overflow-x-auto rounded-lg">
      <table className="min-w-full text-sm text-secondary-text">
        <TableHeader showAction={showAction} isAdmin={user?.role === "admin"} />
        <tbody className="bg-primary-background">
          {bookingsToShow.map(
            (
              booking: BookingTypes & {
                car: CarTypes;
              } & { user: UserTypes },
              index: number
            ) => (
              <BookingRow
                key={index}
                booking={booking}
                index={index}
                showAction={showAction}
                isAdmin={user?.role === "admin"}
                onStatusUpdate={handleStatusUpdate}
                isPending={isPending}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

const TableHeader: React.FC<{ showAction: boolean; isAdmin: boolean }> = ({
  showAction,
  isAdmin,
}) => (
  <thead className="bg-secondary-background text-xs uppercase font-medium text-primary-text">
    <tr>
      <th></th>
      {["User", "Car", "Start Date", "Total Cost", "Status"].map((header) => (
        <th
          key={header}
          scope="col"
          className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
        >
          {header}
        </th>
      ))}
      {(showAction || isAdmin) && (
        <th
          scope="col"
          className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
        >
          Actions
        </th>
      )}
    </tr>
  </thead>
);

const BookingRow: React.FC<{
  booking: BookingTypes & { car: CarTypes } & { user: UserTypes };
  index: number;
  showAction: boolean;
  isAdmin: boolean;
  onStatusUpdate: (bookingId: string, status: BookingStatusTypes) => void;
  isPending: boolean;
}> = ({ booking, index, showAction, isAdmin, onStatusUpdate, isPending }) => (
  <tr
    className={index % 2 === 0 ? "bg-secondary-background bg-opacity-20" : ""}
  >
    <td className="pl-4">{index + 1}</td>
    <td className="px-6 py-4 whitespace-nowrap">{booking.user?.name}</td>
    <td className="px-6 py-4 whitespace-nowrap">{booking.car?.name}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      {new Date(booking.startDate).toLocaleDateString()}
    </td>

    <td className="px-6 py-4 whitespace-nowrap text-primary-green">
      ${booking.totalCost}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <StatusBadge status={booking.status} />
    </td>
    {(showAction || isAdmin) && (
      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
        {booking.status === "pending" && (
          <ActionButtons
            bookingId={booking._id}
            onStatusUpdate={onStatusUpdate}
            isPending={isPending}
            isAdmin={isAdmin}
          />
        )}
      </td>
    )}
  </tr>
);

const StatusBadge: React.FC<{ status: BookingStatusTypes }> = ({ status }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${STATUS_COLORS[status]} text-white`}
  >
    {status}
  </span>
);

const ActionButtons: React.FC<{
  bookingId: string;
  onStatusUpdate: (bookingId: string, status: BookingStatusTypes) => void;
  isPending: boolean;
  isAdmin: boolean;
}> = ({ bookingId, onStatusUpdate, isPending, isAdmin }) => (
  <>
    <Button
      className="text-xs py-1.5 px-1.5"
      onClick={() => onStatusUpdate(bookingId, "cancelled")}
      loading={isPending}
      disabled={isPending}
    >
      Cancel
    </Button>
    {isAdmin && (
      <Button
        className="text-xs py-1.5 px-1.5"
        onClick={() => onStatusUpdate(bookingId, "approved")}
        loading={isPending}
        disabled={isPending}
      >
        Approve
      </Button>
    )}
  </>
);

export default BookingTable;
