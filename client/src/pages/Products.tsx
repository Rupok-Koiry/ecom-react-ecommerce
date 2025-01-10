import { useSearchParams } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import { useAllProducts } from "../hooks/products/useAllProducts";
// import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useAllCategories } from "../hooks/categories/useAllCategories";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [searchParams] = useSearchParams();
  // const productsPerPage = 9;
  const category = searchParams.get("category") as string;
  const discountGte = searchParams.get("discount[gt]") as string;
  // const [currentPage, setCurrentPage] = useState(0);
  const { categories } = useAllCategories();
  const [filters, setFilters] = useState({
    keyword: "",
    priceRange: [0, 5000],
    categories: [] as string[],
  });
  // const handlePageChange = (selectedItem: { selected: number }) => {
  //   setCurrentPage(selectedItem.selected);
  // };

  const { isLoading, error, products } = useAllProducts({
    category,
    "discount[gt]": discountGte ? parseFloat(discountGte) : undefined,
    // page: currentPage + 1,
    // limit: productsPerPage,
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
    const matchesCategories =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category.name);

    return matchesKeyword && matchesPrice && matchesCategories;
  });

  const handleFilterChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        categories: checked
          ? [...prevFilters.categories, value]
          : prevFilters.categories.filter((category) => category !== value),
      }));
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  return (
    <div className="bg-primary-background py-10 lg:py-14 px-5">
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="container mx-auto flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="bg-secondary-background shadow-md rounded-lg p-5 lg:w-1/4">
            <h3 className="text-lg font-semibold mb-4 text-primary-text">
              Filters
            </h3>

            {/* Keyword Search */}
            <input
              type="text"
              name="keyword"
              value={filters.keyword}
              onChange={handleFilterChange}
              placeholder="Search by keyword"
              className="w-full p-3 mb-4 border rounded-md shadow focus:ring focus:ring-primary"
            />

            {/* Categories */}
            <div className="mb-4">
              <h4 className="font-medium mb-2 text-primary-text">Categories</h4>
              {categories?.map((category: any) => (
                <div key={category._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={category.name}
                    onChange={handleFilterChange}
                    checked={filters.categories.includes(category.name)}
                    className="peer h-5 w-5 cursor-pointer transition-all rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                    id={category._id}
                  />
                  <label
                    className="text-sm text-secondary-text ml-3"
                    htmlFor={category._id}
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>

            {/* Price Range */}
            <div>
              <label
                htmlFor="priceRange"
                className="text-sm font-medium mb-2 block text-primary-text"
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
                className="w-full"
              />
            </div>
          </aside>

          {/* Products */}
          <main className="lg:w-3/4">
            <SectionTitle
              title="All Products"
              description={`Browse all products in this shop`}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newFilteredProducts.map((product: any) => (
                <ProductCard product={product} />
              ))}
            </div>

            {/*       
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
            /> */}
          </main>
        </section>
      )}
    </div>
  );
};

export default Products;
