import { useSearchParams } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import { useAllProducts } from "../hooks/products/useAllProducts";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import AddToCartButton from "../components/AddToCartButton";
import CompareButton from "../components/CompareButton";
import { Link } from "react-router-dom";
import { useAllCategories } from "../hooks/categories/useAllCategories";

const Products = () => {
  const [searchParams] = useSearchParams();
  const productsPerPage = 9;
  const category = searchParams.get("category") as string;
  const discountGte = searchParams.get("discount[gt]") as string;
  const [currentPage, setCurrentPage] = useState(0);
  const { categories } = useAllCategories();
  const [filters, setFilters] = useState({
    keyword: "",
    priceRange: [0, 5000],
    category: "",
  });
  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const { isLoading, error, products, totalProducts } = useAllProducts({
    category,
    "discount[gt]": discountGte ? parseFloat(discountGte) : undefined,
    page: currentPage + 1,
    limit: productsPerPage,
    sort: "-_id",
  });

  if (error)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {error?.message}
      </h2>
    );

  const newFilteredProducts = products.filter((product: any) => {
    const matchesKeyword = product.name
      .toLowerCase()
      .includes(filters.keyword.toLowerCase());
    const matchesPrice =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];
    const matchesCategory =
      !filters.category || product.category.name === filters.category;

    return matchesKeyword && matchesPrice && matchesCategory;
  });

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="bg-primary-background py-10 lg:py-14 px-5">
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="container mx-auto">
          <SectionTitle
            title="All Products"
            description={`Browse all products in this shop`}
          />

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="keyword"
              value={filters.keyword}
              onChange={handleFilterChange}
              placeholder="Search by keyword"
              className="flex-1 p-3 border rounded-md shadow focus:ring focus:ring-primary"
            />

            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="flex-1 p-3 border rounded-md shadow focus:ring focus:ring-primary"
            >
              <option value="">All Categories</option>
              {categories?.map((category: any) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="flex flex-1 flex-col">
              <label
                htmlFor="priceRange"
                className="text-sm text-primary-text font-medium"
              >
                Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </label>
              <input
                type="range"
                name="priceRange"
                min="0"
                max="5000"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: [0, parseInt(e.target.value, 10)],
                  })
                }
                className="flex-1 p-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newFilteredProducts.map((product: any) => (
              <div
                key={product._id}
                className="relative bg-primary-background p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ease-in duration-300"
              >
                <Link to={`/products/${product._id}`}>
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
                </Link>

                <div className="flex justify-between gap-3">
                  <AddToCartButton product={product} />

                  <CompareButton product={product} />
                </div>
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
