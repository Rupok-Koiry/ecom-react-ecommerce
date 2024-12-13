import { useState } from "react";
import { useParams } from "react-router";
import SectionTitle from "../components/SectionTitle";
import { useVendorOrders } from "../hooks/orders/useVendorOrders";
import ReactPaginate from "react-paginate";
import Spinner from "../components/Spinner";

const VendorOrderHistory = () => {
  const { shopId } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 10;
  const { orders, totalOrders, isLoading, error } = useVendorOrders(
    shopId as string,
    currentPage + 1,
    ordersPerPage
  );

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };
  if (isLoading) return <Spinner />;
  if (error)
    return (
      <h2 className="text-center text-2xl font-bold text-error-color">
        {error?.message}
      </h2>
    );

  return (
    <section className="py-8 lg:py-10">
      <SectionTitle title="Order History" />
      <div className="w-full max-w-3xl p-4 sm:p-6 lg:p-8 bg-primary-white shadow-lg rounded-xl mx-auto space-y-6">
        {orders?.length ? (
          orders.map((order: any) => (
            <div
              key={order._id}
              className="p-6 bg-secondary-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center border-b border-primary-grey pb-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order #{order.tran_id}
                  </h2>
                  <p className="text-secondary-text text-sm">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-secondary-text text-sm">
                    Shop: {order.shop.name}
                  </p>
                </div>
                <div>
                  <span
                    className={`px-3 py-2 border rounded-full capitalize font-medium ${
                      order.status === "success"
                        ? "bg-success-color/10 text-success-color border-success-color"
                        : order.status === "failed"
                        ? "bg-error-color/10 text-error-color border-error-color"
                        : "bg-warning-color/10 text-warning-color border-warning-color"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Product List */}
              <div className="mb-4">
                <h3 className="text-md font-medium mb-3">Products:</h3>
                <ul className="divide-y divide-primary-grey">
                  {order.products.map((item: any, index: number) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-2"
                    >
                      <span>{item.product.name}</span>
                      <span className="text-secondary-text">
                        {item.quantity} x ${item.product.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Total */}
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-secondary-text">No orders found.</p>
        )}

        {/* Pagination */}
        <ReactPaginate
          pageCount={Math.ceil(totalOrders / ordersPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex justify-center items-center space-x-2"
          activeClassName="bg-primary-brand text-primary-white"
          pageClassName="px-3 py-1 rounded-md border border-primary-grey"
          previousLabel="<"
          nextLabel=">"
          previousClassName="px-3 py-1 rounded-md border border-primary-grey"
          nextClassName="px-3 py-1 rounded-md border border-primary-grey"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </section>
  );
};

export default VendorOrderHistory;
