import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../redux/cartSlice";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";

type CartItemProps = {
  product: any;
};

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useDispatch();

  const handleRemoveProduct = (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary-brand)",
      cancelButtonColor: "var(--error-color)",
      confirmButtonText: "Yes, Delete it!",
      background: "var(--secondary-background)",
      color: "var(--primary-text)",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeItem(productId));
      }
    });
  };

  return (
    <div
      className="flex flex-wrap gap-5 items-center justify-between bg-secondary-background p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      key={product._id}
    >
      {/* Product Info */}
      <div className="flex items-center gap-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-16 h-16 object-contain rounded-lg"
        />
        <div>
          <h2 className="text-lg font-semibold text-primary-text">
            {product.name}
          </h2>
          <p className="text-secondary-brand font-bold">${product.price}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {/* Decrement Quantity */}
        <button
          className={`bg-primary-brand hover:bg-primary-brand-dark transition duration-300 text-primary-white p-2 rounded-lg font-bold ${
            product.quantity <= 1 && "bg-primary-grey cursor-not-allowed"
          }`}
          onClick={() => dispatch(decrementQuantity(product._id))}
          disabled={product.quantity <= 1}
        >
          <LuMinus />
        </button>
        {/* Quantity Display */}
        <p className="text-primary-text">{product.quantity}</p>
        {/* Increment Quantity */}
        <button
          className={`bg-primary-brand hover:bg-primary-brand-dark transition duration-300 text-primary-white p-2 rounded-lg font-bold ${
            product.quantity >= product.stock &&
            "bg-primary-grey cursor-not-allowed"
          }`}
          onClick={() => dispatch(incrementQuantity(product._id))}
          disabled={product.quantity >= product.stock}
        >
          <GoPlus />
        </button>
        {/* Remove Item */}
        <button
          className="bg-error-color hover:bg-error-color-dark transition-colors duration-300 text-primary-white px-3 py-1 rounded-lg"
          onClick={() => handleRemoveProduct(product._id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
