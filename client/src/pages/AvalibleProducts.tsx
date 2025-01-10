import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import { useAllProducts } from "../hooks/products/useAllProducts";
import { useUserProfile } from "../hooks/users/useUserProfile";
import { useAllCategories } from "../hooks/categories/useAllCategories";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const AvailableProducts = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    priceRange: [0, 5000],
    category: "",
  });
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const productsPerPage = 10;

  const { userProfile } = useUserProfile();
  const { categories } = useAllCategories();
  const { products, isLoading, error } = useAllProducts({
    sort: "-_id",
  });

  useEffect(() => {
    if (products) {
      const followedShopProducts = products.filter((product: any) =>
        userProfile?.followedShops?.includes(product.shop?._id)
      );
      const otherProducts = products.filter(
        (product: any) =>
          !userProfile?.followedShops?.includes(product.shop?._id)
      );

      const prioritizedProducts = [...followedShopProducts, ...otherProducts];

      const newFilteredProducts = prioritizedProducts.filter((product) => {
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
      setFilteredProducts(newFilteredProducts as any);
    }
  }, [products, filters, userProfile]);

  useEffect(() => {
    const newPageProducts = filteredProducts.slice(0, page * productsPerPage);
    setDisplayedProducts(newPageProducts);
    setHasMore(newPageProducts.length < filteredProducts.length);
  }, [filteredProducts, page]);

  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: value });
    setPage(1);
  };

  if (error)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {error?.message}
      </h2>
    );

  return (
    <div className="bg-primary-background py-10 lg:py-14 px-5 ">
      <section className="container mx-auto border-b border-secondary-grey">
        <SectionTitle
          title="Shop Products"
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

        <InfiniteScroll
          dataLength={displayedProducts.length}
          next={loadMoreProducts}
          hasMore={hasMore}
          scrollThreshold={0.5}
          loader={<Spinner />}
          endMessage={
            <p className="text-center text-gray-500 mt-4">
              You have seen all products.
            </p>
          }
          style={{ overflow: "hidden" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <ProductCardSkeleton items={3} />
            ) : (
              displayedProducts.map((product: any) => (
                <ProductCard product={product} key={product._id} />
              ))
            )}
          </div>
        </InfiniteScroll>
      </section>
    </div>
  );
};

export default AvailableProducts;
