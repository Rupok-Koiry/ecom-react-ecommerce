import { useSearchParams } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import { useAllProducts } from "../hooks/products/useAllProducts";

const Products = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") as string;
  const discountGte = searchParams.get("discount[gt]") as string;

  const { isLoading, error, products } = useAllProducts({
    category,
    "discount[gt]": discountGte ? parseFloat(discountGte) : undefined,
  });

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {error?.message}
      </h2>
    );

  return (
    <div className="bg-primary-background py-10 lg:py-14 px-5">
      <section className="container mx-auto">
        <SectionTitle
          title="Shop Products"
          description={`Browse all products in this shop`}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </section>
    </div>
  );
};

export default Products;
