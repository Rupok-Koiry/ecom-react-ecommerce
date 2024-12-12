import { useNavigate } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import { useAllProducts } from "../../hooks/products/useAllProducts";

const FlashSale = () => {
  const navigate = useNavigate();
  const { products } = useAllProducts({
    limit: 3,
    "discount[gt]": 0,
  });

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
        {products.map((product: any) => (
          <div
            key={product._id}
            className="relative bg-primary-background p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ease-in duration-300"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-52 object-contain rounded-lg mb-4 bg-[rgba(109,123,255,0.2)]"
            />
            {product.discount > 0 && (
              <div className="absolute top-4 right-4 bg-error-color font-playwrite  text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg">
                {product.discount}% OFF
              </div>
            )}
            <h3 className="text-lg font-bold text-primary-text mb-2">
              {product.name}
            </h3>
            <p className="text-success-color font-semibold mb-4 font-playwrite text-lg">
              ${product.price}
            </p>
          </div>
        ))}
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
