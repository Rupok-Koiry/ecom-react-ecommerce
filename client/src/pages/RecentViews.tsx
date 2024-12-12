import SectionTitle from "../components/SectionTitle";
import { Link } from "react-router-dom";
import { useLocalStorageState } from "../utils/useLocalStorageState";

const RecentViews = () => {
  const [recentViews] = useLocalStorageState([], "recentViews");

  return (
    <section className="container mx-auto  lg:py-14 py-10 px-5">
      <SectionTitle
        title="Recent Views"
        description={"Your recently viewed products are displayed here."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentViews.map((product: any) => (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            className="bg-primary-background p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-contain rounded-lg mb-4 bg-[rgba(109,123,255,0.2)]"
            />
            <h3 className="text-lg font-bold text-primary-text mb-2">
              {product.name}
            </h3>
            <p className="text-success-color font-semibold mb-4 font-playwrite text-lg">
              ${product.price}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentViews;
