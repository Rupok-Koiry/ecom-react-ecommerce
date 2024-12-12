import ErrorMessage from "../components/ErrorMessage";
import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import { useAllOrders } from "../hooks/orders/useAllOrders";

const ManageTransactions = () => {
  const { orders, isLoading, error } = useAllOrders();

  if (error) return <ErrorMessage message={error.message} />;
  if (!orders?.length && !isLoading)
    return <ErrorMessage message={"No Transaction Found"} />;
  return (
    <section className="py-8 lg:py-10">
      <SectionTitle title="Manage Transactions" />
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
                    User Name
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                    Shop Name
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                    Total Products
                  </th>
                  <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-primary-background">
                {orders.map((order: any, index: number) => (
                  <tr
                    key={order._id}
                    className={`${
                      index % 2 === 0
                        ? "bg-secondary-background bg-opacity-20"
                        : ""
                    }`}
                  >
                    <td className="pl-4">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.shop.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.products.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.tran_id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageTransactions;
