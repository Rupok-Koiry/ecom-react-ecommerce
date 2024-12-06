import UserTable from "../components/UserTable";

const ManageUsers = () => {
  return (
    <section className="py-8 lg:py-10">
      <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-8">
        Manage Users
      </h2>
      <UserTable />
    </section>
  );
};

export default ManageUsers;
