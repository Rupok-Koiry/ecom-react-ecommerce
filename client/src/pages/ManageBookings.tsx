import BookingTable from "../components/BookingTable";

const ManageBookings = () => {
  return (
    <section className="py-8 lg:py-10">
      {/* Header */}
      <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-8">
        Manage Booking
      </h2>
      <BookingTable />
    </section>
  );
};

export default ManageBookings;
