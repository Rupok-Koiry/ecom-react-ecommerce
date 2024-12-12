import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import Swal from "sweetalert2";
import { RootState } from "../redux/store";
import { clearCart } from "../redux/cartSlice";
import CartItem from "../components/Cart/CartItem";

const Cart = () => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveProduct = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-brand)",
      cancelButtonColor: "var(--error-color)",
      confirmButtonText: "Yes, Empty The cart!",
      background: "var(--secondary-background)",
      color: "var(--primary-text)",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
      }
    });
  };

  return (
    <section className="border-b border-primary-grey py-10 lg:py-14 bg-primary-background px-5">
      <SectionTitle
        title="Cart"
        description="Explore and manage your selected camping essentials with ease on our dedicated cart page, ensuring each adventure is perfectly equipped."
        className="text-center text-primary-text"
      />

      {items.length === 0 ? (
        <div
          className="mx-auto w-full max-w-3xl bg-info-color border border-primary-brand text-info-color-light px-4 rounded-lg text-center py-6"
          role="alert"
        >
          <strong className="font-medium text-2xl md:text-3xl text-primary-white">
            Your cart is empty!
          </strong>
        </div>
      ) : (
        <div className="w-full max-w-3xl p-4 sm:p-6 lg:p-8 bg-primary-white shadow-lg rounded-xl mx-auto">
          <div className="flex flex-col gap-4">
            {items.map((product, index) => (
              <CartItem key={index} product={product} />
            ))}
          </div>
          <button
            className="w-full bg-error-color hover:bg-error-color-dark py-2 sm:py-3 mt-4 text-lg sm:text-xl text-primary-white rounded-lg transition-colors duration-300"
            onClick={handleRemoveProduct}
          >
            Clear Cart
          </button>
          <div className="mt-8 text-center">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-text">
              Total:{" "}
              <span className="text-secondary-brand">
                ${totalPrice.toFixed(2)}
              </span>
            </h3>
            <Link
              className={`py-2 sm:py-3 mt-4 text-lg sm:text-xl text-primary-white rounded-lg transition-colors duration-300 block ${
                items.some((item) => item.quantity > item.stock)
                  ? "bg-primary-grey cursor-not-allowed"
                  : "bg-primary-brand hover:bg-primary-brand-dark"
              }`}
              to="/checkout"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
