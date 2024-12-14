import React from "react";
import { addItem, clearCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Swal from "sweetalert2";
import { FaCartPlus } from "react-icons/fa6";
import toast from "react-hot-toast";

const AddToCartButton: React.FC<any> = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const handleAddToCart = (product: any) => {
    // Check if cart items are from the same vendor
    const differentVendor =
      cart.items.length > 0 && cart.items[0].vendor !== product.vendor;

    if (differentVendor) {
      Swal.fire({
        title: "Different Vendor Detected",
        text: "This product is from a different vendor. Would you like to replace your cart with this product or keep the current items?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Replace",
        cancelButtonText: "Keep",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(clearCart());
          dispatch(addItem(product));
        }
      });
    } else {
      dispatch(addItem(product));
      toast.success("Added to cart");
    }
  };
  return (
    <button
      onClick={() => handleAddToCart(product)}
      className="flex items-center gap-2 px-4 py-2 bg-primary-brand text-primary-white rounded-md shadow-md hover:bg-secondary-brand transition duration-300"
    >
      <FaCartPlus />
    </button>
  );
};

export default AddToCartButton;
