import { useState } from "react";
import Button from "../components/Button";
import { BookingTypes, CarTypes } from "../constants/types";
import ReturnCarModal from "../components/modals/ReturnCarModal";
import { useBookings } from "../hooks/bookings/useBookings";
import { useReturnCar } from "../hooks/cars/useReturnCar";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const ManageReturn = () => {
  const { bookings, error, isLoading } = useBookings();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<
    | (BookingTypes & {
        car: CarTypes;
      })
    | null
  >(null);
  const { returnCar, isPending } = useReturnCar();
  const handleReturnCar = (endDate: string) => {
    if (selectedBooking)
      returnCar(
        {
          bookingId: selectedBooking?._id,
          endDate,
        },
        {
          onSuccess: () => {
            setModalIsOpen(false);
          },
        }
      );
  };

  const bookedCars = bookings?.filter(
    (
      booking: BookingTypes & {
        car: CarTypes;
      }
    ) => booking?.car?.status === "unavailable"
  );

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!bookedCars?.length)
    return <ErrorMessage message={"No Booked Car Found"} />;

  return (
    <section className="py-8 lg:py-10">
      <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-8">
        Manage Cars
      </h2>
      <div className="shadow overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm text-secondary-text">
          <thead className="bg-secondary-background text-xs uppercase font-medium text-primary-text">
            <tr>
              <th></th>
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
              >
                Car Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
              >
                Color
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider whitespace-nowrap"
              >
                Price Per Hour
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left tracking-wider whitespace-nowrap flex items-center gap-3"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary-background">
            {bookedCars.map(
              (
                booking: BookingTypes & {
                  car: CarTypes;
                },
                index: number
              ) => (
                <tr
                  key={booking.car._id}
                  className={`${
                    index % 2 === 0
                      ? "bg-secondary-background bg-opacity-20"
                      : ""
                  }`}
                >
                  <td className="pl-4">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.car.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.car.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.car.color}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {booking.car.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-primary-green">
                    ${booking.car.pricePerHour}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                    <Button
                      className="text-sm py-2 px-2"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setModalIsOpen(true);
                      }}
                    >
                      Return
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <ReturnCarModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          booking={selectedBooking}
          onReturnCar={handleReturnCar}
          loading={isPending}
        />
      </div>
    </section>
  );
};

export default ManageReturn;
