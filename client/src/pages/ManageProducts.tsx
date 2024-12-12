import ProductTable from "../components/ProductTable";
import SectionTitle from "../components/SectionTitle";

const ManageProducts = () => {
  return (
    <section className="py-8 lg:py-10">
      <SectionTitle title="Manage Products" />
      <ProductTable />
    </section>
  );
};

export default ManageProducts;
