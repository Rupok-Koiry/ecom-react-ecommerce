import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { clearComparison } from "../redux/comparisonSlice";
import SectionTitle from "../components/SectionTitle";

const Comparison: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.comparison);

  const dispatch = useDispatch();

  return (
    <div className="lg:py-14 py-10  w-full max-w-5xl mx-auto px-5">
      <SectionTitle
        title="Product Comparison"
        description="Compare the features of different products"
      />

      {products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-2">
            <thead>
              <tr className="text-primary-text uppercase text-sm">
                <th className="p-4 text-left font-semibold">Attribute</th>
                {products.map((product) => (
                  <th key={product._id} className="p-4 text-left font-semibold">
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Description", key: "description" },
                { label: "Price", key: "price", prefix: "$" },
                { label: "Category", key: "category.name" },
                { label: "Rating", key: "averageRating", suffix: "/ 5" },
              ].map(({ label, key, prefix = "", suffix = "" }) => (
                <tr key={label} className="border-b last:border-none">
                  <td className="p-4 text-primary-text font-medium bg-secondary-background">
                    {label}
                  </td>
                  {products.map((product) => {
                    const value = key
                      .split(".")
                      .reduce((o, i) => o[i], product);
                    return (
                      <td
                        key={product._id}
                        className="p-4 text-secondary-text bg-primary-white"
                      >
                        {prefix}
                        {value}
                        {suffix}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => dispatch(clearComparison())}
            className="mt-8 mx-auto block px-6 py-3 bg-primary-brand text-primary-white font-bold rounded-lg shadow-md hover:shadow-lg focus:ring-4 focus:ring-secondary-brand transition-all duration-300"
          >
            Clear Comparison
          </button>
        </div>
      ) : (
        <div className="text-center text-secondary-text py-12">
          <p className="text-xl">No products to compare</p>
          <p className="text-sm mt-2">
            Add some products to compare their features side-by-side.
          </p>
        </div>
      )}
    </div>
  );
};

export default Comparison;
