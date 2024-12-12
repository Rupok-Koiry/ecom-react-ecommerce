import ReviewTable from "../components/ReviewTable";
import SectionTitle from "../components/SectionTitle";

const ManageReviews = () => {
  return (
    <section className="py-8 lg:py-10">
      <SectionTitle title="Manage Reviews" />
      <ReviewTable />
    </section>
  );
};

export default ManageReviews;
