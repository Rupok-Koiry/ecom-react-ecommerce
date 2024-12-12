import { useSearchParams } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import { useAllProducts } from "../hooks/products/useAllProducts";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const productsPerPage = 9;
  const category = searchParams.get("category") as string;
  const discountGte = searchParams.get("discount[gt]") as string;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };
  const { isLoading, error, products, totalProducts } = useAllProducts({
    category,
    "discount[gt]": discountGte ? parseFloat(discountGte) : undefined,
    page: currentPage + 1,
    limit: productsPerPage,
  });

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
      )}
      {/* Pagination */}
      <ReactPaginate
        pageCount={Math.ceil(totalProducts / productsPerPage)}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center items-center space-x-2 mt-5"
        activeClassName="bg-primary-brand text-primary-white"
        pageClassName="px-3 py-1 rounded-md border border-primary-grey"
        previousLabel="<"
        nextLabel=">"
        previousClassName="px-3 py-1 rounded-md border border-primary-grey"
        nextClassName="px-3 py-1 rounded-md border border-primary-grey"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default Products;
