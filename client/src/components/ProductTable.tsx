import { FaPlus, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import Button from "./Button";
import { useDeleteProduct } from "../hooks/products/useDeleteProduct";
import { useState } from "react";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { useAllProducts } from "../hooks/products/useAllProducts";
import ProductModal from "./modals/ProductModal";
import { IoDuplicate } from "react-icons/io5";
import { useDuplicateProduct } from "../hooks/products/useDuplicateProduct";
import ReactPaginate from "react-paginate";
import { useUserProfile } from "../hooks/users/useUserProfile";

const ProductTable = () => {
  const { deleteProduct } = useDeleteProduct();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { duplicate } = useDuplicateProduct();
  const { userProfile } = useUserProfile();
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10;
  const { products, error, isLoading, totalProducts } = useAllProducts({
    page: currentPage + 1,
    limit: productsPerPage,
    vendor: userProfile._id,
  });

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };
  if (error) return <ErrorMessage message={error.message} />;
  if (!products.length && !isLoading)
    return <ErrorMessage message={"No Products Found"} />;

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="shadow overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm text-secondary-text">
            <thead className="bg-secondary-background text-xs uppercase font-medium text-primary-text">
              <tr>
                <th></th>
                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                  Description
                </th>
                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                  Price
                </th>
                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                  Category
                </th>
                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap flex items-center gap-3">
                  Actions
                  <Button
                    className="text-sm py-2 px-2"
                    onClick={() => {
                      setSelectedProduct(null);
                      setModalIsOpen(true);
                    }}
                  >
                    <FaPlus />
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-background">
              {products.map((product: any, index: number) => (
                <tr
                  key={product._id}
                  className={`${
                    index % 2 === 0
                      ? "bg-secondary-background bg-opacity-20"
                      : ""
                  }`}
                >
                  <td className="pl-4">
                    {currentPage * productsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-success-color">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium uppercase`}
                    >
                      {product.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                    <Button
                      className="text-sm py-2 px-2"
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalIsOpen(true);
                      }}
                    >
                      <FaRegPenToSquare />
                    </Button>
                    <Button
                      className="text-sm py-2 px-2"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <FaRegTrashCan />
                    </Button>
                    <Button
                      className="text-sm py-2 px-2"
                      onClick={() => duplicate(product._id)}
                    >
                      <IoDuplicate />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ProductModal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            product={selectedProduct}
          />
        </div>
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

export default ProductTable;
