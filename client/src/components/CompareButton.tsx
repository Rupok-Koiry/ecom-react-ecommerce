import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCompare,
  removeProductFromCompare,
} from "../redux/comparisonSlice";
import { RootState } from "../redux/store";
import toast from "react-hot-toast";
import { AiOutlineCheckCircle, AiOutlinePlusCircle } from "react-icons/ai";

const CompareButton: React.FC<any> = ({ product }) => {
  const dispatch = useDispatch();
  const comparisonProducts = useSelector(
    (state: RootState) => state.comparison.products
  );
  const isAdded = comparisonProducts.some((p: any) => p._id === product._id);

  const handleClick = () => {
    if (comparisonProducts.length === 3) {
      return toast.error("You can only compare up to 3 products.");
    }

    if (
      comparisonProducts.length > 0 &&
      comparisonProducts[0].category._id !== product.category._id
    ) {
      return toast.error(
        "All compared products must belong to the same category."
      );
    }
    if (isAdded) {
      dispatch(removeProductFromCompare(product._id));
    } else {
      dispatch(addProductToCompare(product));
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md shadow-md hover:bg-secondary-brand transition duration-300 ${
        isAdded
          ? "bg-error-color text-primary-white"
          : "bg-primary-brand text-primary-white"
      }`}
      title={isAdded ? "Remove from comparison" : "Add to comparison"}
    >
      {isAdded ? (
        <AiOutlineCheckCircle size={20} />
      ) : (
        <AiOutlinePlusCircle size={20} />
      )}
    </button>
  );
};

export default CompareButton;
