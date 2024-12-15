import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { applyCoupon } from "../redux/cartSlice";
import toast from "react-hot-toast";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import api from "../services/api";

const Checkout = () => {
  const [coupon, setCoupon] = useState("");
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const [loading, setLoading] = useState(false);
  const handlePayment = async (formData: any) => {
    if (formData.products.length === 0) return toast.error("Cart is empty!");
    try {
      setLoading(true);
      const response = await api.post(
        `/transactions/init-transaction`,
        formData
      );
      setLoading(false);
      window.location.href = response.data.data;
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };
  const handleApplyCoupon = () => {
    if (coupon === "GET20") {
      dispatch(applyCoupon(coupon));
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid or already applied coupon!");
    }
  };

  return (
    <section className="flex items-center justify-center lg:py-14 py-12 px-5">
      <div className="w-full max-w-3xl p-6 lg:p-8 bg-primary-white shadow-lg rounded-xl">
        <SectionTitle
          title="Checkout"
          description="Apply coupon codes for discounts during checkout."
        />

        {/* Order Summary */}
        <div className="bg-primary-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-primary-text mb-4">
            Order Summary
          </h2>
          <ul className="space-y-4">
            <ul>
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between text-primary-text"
                >
                  <div className="flex gap-2">
                    <span>{item.name}</span>
                    <span>
                      ${item.price}X{item.quantity}
                    </span>
                  </div>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>

            <li className="flex justify-between font-bold text-primary-text">
              <span>Total</span>
              <span>${totalPrice}</span>
            </li>
          </ul>
          <div className="mt-6">
            <label htmlFor="coupon" className="block text-secondary-text mb-2">
              Coupon Code
            </label>
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                id="coupon"
                className="flex-1 px-3 py-2 border border-primary-grey rounded-lg  focus:outline-none focus:ring-2 focus:ring-primary-brand"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                className="bg-primary-brand hover:bg-primary-brand-dark text-primary-white px-3 py-1.5 rounded-lg  transition-colors"
                onClick={handleApplyCoupon}
              >
                Apply
              </button>
            </div>
            <span className="text-sm text-primary-grey">
              HINT: Coupon is "GET20"
            </span>
          </div>
        </div>
        <Button
          className="w-full my-5"
          onClick={() =>
            handlePayment({
              products: items.map((item) => ({
                product: item._id,
                quantity: item.quantity,
              })),
              totalPrice: totalPrice,
              shopId: items[0]?.shop._id,
            })
          }
          loading={loading}
          disabled={loading}
        >
          Pay
        </Button>
      </div>
    </section>
  );
};

export default Checkout;
