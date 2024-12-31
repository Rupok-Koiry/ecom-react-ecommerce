import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import AddToCartButton from "./AddToCartButton";
import CompareButton from "./CompareButton";

const ProductCard = ({ product }: { product: any }) => {
  // Function to render the stars based on the average rating
  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 >= 0.5; // Half star
    const emptyStars = 5 - Math.ceil(rating); // Empty stars

    const stars = [];
    // Add full stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }
    // Add half star if needed
    if (halfStar) {
      stars.push(
        <FaStarHalfAlt key={`half-star`} className="text-yellow-400" />
      );
    }
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-star-${i}`} className="text-yellow-400" />
      );
    }
    return stars;
  };

  return (
    <div
      key={product._id}
      className="relative bg-primary-background p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ease-in duration-300"
    >
      <Link to={`/products/${product._id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-52 object-contain rounded-lg mb-4 bg-[rgba(109,123,255,0.2)]"
        />
        {product.discount > 0 && (
          <div className="absolute top-4 right-4 bg-error-color font-playwrite text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg">
            {product.discount}% OFF
          </div>
        )}
        <h3 className="text-lg font-bold text-primary-text mb-2">
          {product.name}
        </h3>
        <p className="text-success-color font-semibold mb-4 font-playwrite text-lg">
          ${product.price}
        </p>
      </Link>

      {/* Rating Section */}
      <div className="flex items-center mb-4">
        <div className="flex gap-1">
          {renderStars(product.averageRating)} {/* Render star ratings */}
        </div>
        <span className="text-sm text-gray-500 ml-2">
          {product.ratingsCount} ratings
        </span>
      </div>

      <div className="flex justify-between gap-3">
        <AddToCartButton product={product} />
        <CompareButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
