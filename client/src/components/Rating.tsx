import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type RatingProps = {
  value: number;
  className?: string;
  color?: string;
};
const Rating = ({ value, color = "#ff5722", className }: RatingProps) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} color={color} />
      ))}
      {hasHalfStar && <FaStarHalfAlt color={color} />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} color={color} />
      ))}
    </div>
  );
};

export default Rating;
