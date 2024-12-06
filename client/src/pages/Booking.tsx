import CarList from "../components/CarList";
import { useState } from "react";
import BookingModal from "../components/modals/BookingModal";
import { CarTypes } from "../constants/types";
import { useMe } from "../hooks/auth/useMe";
import { useCreateBooking } from "../hooks/bookings/useCreateBooking";
import BookingFilter from "../components/BookingFilter";

const Booking = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showFilterCars, setShowFilterCars] = useState(false);
  const [selectedCar, setSelectedCar] = useState<null | CarTypes>(null);
  const { user } = useMe();
  const { createBooking, isPending } = useCreateBooking();

  const handleSubmit = () => {
    setShowFilterCars(true);
  };

  const handleButtonClick = (car: CarTypes) => {
    setSelectedCar(car);
    setIsOpen(true);
  };

  const handleSubmitBooking = () => {
    if (!selectedCar) return;

    // Calculate total cost
    const newBooking = {
      user: user._id as string,
      car: selectedCar._id,
      startDate: new Date().toISOString(),
      totalCost: 0,
      status: "pending" as const,
    };
    createBooking(newBooking, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };
  return (
    <section className="bg-primary-background py-8 lg:py-10  container mx-auto px-5">
      <BookingFilter onSubmit={handleSubmit} buttonText="Search Car" />
      {showFilterCars && (
        <CarList buttonText="Book Now" onButtonClick={handleButtonClick} />
      )}
      <BookingModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setIsOpen}
        car={selectedCar}
        handleSubmitBooking={handleSubmitBooking}
        loading={isPending}
      />
    </section>
  );
};

export default Booking;
