import { useNavigate } from "react-router-dom";
import SectionTitle from "../SectionTitle";

const FlashSale = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 bg-secondary-background">
      {/* Section Title */}
      <SectionTitle
        title="Flash Sale"
        description="Grab these limited-time deals before they're gone!"
        className="text-center"
      />

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {[].map((product: any) => (
          <div
            key={product.id}
            className="p-4 bg-primary-background rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold text-primary-text">
              {product.name}
            </h3>
            <p className="text-secondary-text mt-2">
              <span className="line-through mr-2 text-secondary-grey">
                ${product.originalPrice}
              </span>
              <span className="text-success-color">${product.salePrice}</span>
            </p>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/flash-sale")}
          className="px-6 py-3 bg-primary-brand text-primary-white font-bold rounded-md hover:bg-secondary-brand transition-colors duration-300"
        >
          View All Flash Sale Products
        </button>
      </div>
    </section>
  );
};

export default FlashSale;
