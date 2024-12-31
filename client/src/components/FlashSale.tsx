import { useNavigate } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import { useAllProducts } from "../hooks/products/useAllProducts";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductCard from "./ProductCard";

const FlashSale = () => {
  const navigate = useNavigate();
  const { products, error, isLoading } = useAllProducts({
    limit: 3,
    "discount[gt]": 0,
  });

  if (error)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {error.message}
      </h2>
    );

  return (
    <section className="py-10 bg-primary-background container px-5 mx-auto">
      {/* Section Title */}
      <SectionTitle
        title="Flash Sale"
        description="Grab these limited-time deals before they're gone!"
        className="text-center"
      />

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {isLoading ? (
          <ProductCardSkeleton items={3} />
        ) : (
          products.map((product: any) => (
            <ProductCard product={product} key={product._id} />
          ))
        )}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/products?discount[gt]=0")}
          className="px-6 py-3 bg-primary-brand text-primary-white rounded-md hover:bg-secondary-brand transition-colors duration-300"
        >
          View All Flash Sale Products
        </button>
      </div>
    </section>
  );
};

export default FlashSale;
