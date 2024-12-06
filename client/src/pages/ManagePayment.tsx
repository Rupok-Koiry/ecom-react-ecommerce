import { useState } from "react";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import { BookingTypes, CarTypes, UserTypes } from "../constants/types";
import { useUserBookings } from "../hooks/bookings/useUserBookings";
import api from "../services/api";
import { format } from "date-fns";

const ManagePayment = () => {
  const { userBookings, error, isLoading } = useUserBookings();
  const [loading, setLoading] = useState(false);
  const handlePayment = async (bookingId: string) => {
    setLoading(true);
    const response = await api.post(`/payment/init-payment`, { bookingId });
    setLoading(false);
    window.location.href = response.data.data;
  };
  const unPaidBookings = userBookings?.filter(
    (
      booking: BookingTypes & {
        user: UserTypes;
      } & {
        car: CarTypes;
      }
    ) => booking.car.status === "available" && !booking.isPaid
  );

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!unPaidBookings?.length)
    return <ErrorMessage message={"No Due Payments Found"} />;

  return (
    <section className="py-8 lg:py-10">
      {/* Header */}
      <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-8">
        Manage Booking
      </h2>
      <div className="shadow overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm text-secondary-text">
          {/* Table Header */}
          <thead className="bg-secondary-background text-xs uppercase font-medium text-primary-text">
            <tr>
              <th></th>
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
              >
                User
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
              >
                Car
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
              >
                Start Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
              >
                End Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
              >
                Total Cost
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
              >
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-primary-background">
            {unPaidBookings.map(
              (
                booking: BookingTypes & {
                  user: UserTypes;
                } & {
                  car: CarTypes;
                },
                index: number
              ) => (
                <tr
                  key={booking._id}
                  className={
                    index % 2 === 0
                      ? "bg-secondary-background bg-opacity-20"
                      : ""
                  }
                >
                  <td className="pl-4">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.car.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(booking.startDate, "yyyy-MM-dd HH:mm")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.endDate &&
                      format(booking.endDate, "yyyy-MM-dd HH:mm")}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-primary-green">
                    ${booking.totalCost}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    <Button
                      className="text-sm py-2 px-2"
                      onClick={() => handlePayment(booking._id)}
                      disabled={loading}
                      loading={loading}
                    >
                      Pay
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManagePayment;
