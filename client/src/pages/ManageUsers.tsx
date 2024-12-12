import SectionTitle from "../components/SectionTitle";
import UserTable from "../components/UserTable";

const ManageUsers = () => {
  return (
    <section className="py-8 lg:py-10">
      <SectionTitle title="Manage Users" />
      <UserTable />
    </section>
  );
};

export default ManageUsers;
