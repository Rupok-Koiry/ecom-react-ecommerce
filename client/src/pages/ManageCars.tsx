import CarTable from "../components/CarTable";

const ManageCars = () => {
  return (
    <section className="py-8 lg:py-10">
      <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-8">
        Manage Cars
      </h2>
      <CarTable />
    </section>
  );
};

export default ManageCars;
