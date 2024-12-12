import CategoryTable from "../components/CategoryTable";
import SectionTitle from "../components/SectionTitle";

const ManageCategories = () => {
  return (
    <section className="py-8 lg:py-10">
      <SectionTitle title="Manage Categories" />
      <CategoryTable />
    </section>
  );
};

export default ManageCategories;
