import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useAllShops } from "../hooks/shops/useAllShops";
import { format } from "date-fns";
import { useAllProducts } from "../hooks/products/useAllProducts";

const Shops = () => {
  const { isLoading, shops, error } = useAllShops();
  const { products } = useAllProducts();

  if (error)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {error?.message}
      </h2>
    );

  return (
    <div className="bg-primary-background py-10 lg:py-14 px-5">
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="container mx-auto">
          <SectionTitle
            title="All Shops"
            description="Browse through the collection of shops available on our platform."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop: any) => (
              <div
                key={shop._id}
                className="relative bg-primary-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ease-in-out duration-300"
              >
                <Link to={`/shops/${shop._id}`}>
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-52 object-cover rounded-lg mb-4 bg-[rgba(109,123,255,0.1)]"
                  />
                  <h3 className="text-lg font-bold text-primary-text mb-2 font-playwrite">
                    {shop.name}
                  </h3>
                  <p className="text-secondary-text mb-2 line-clamp-2">
                    {shop.description}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    Joined on:{" "}
                    <span className="text-success-color">
                      {format(new Date(shop.createdAt), "MMMM dd, yyyy")}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    Total Products:{" "}
                    <span className="text-success-color">
                      {
                        products.filter(
                          (product: any) => product.shop._id === shop._id
                        ).length
                      }
                    </span>
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Shops;
