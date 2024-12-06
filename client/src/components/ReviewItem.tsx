import React from "react";
import Rating from "./Rating";

interface ReviewItemProps {
  imgUrl: string;
  name: string;
  reviewText: string;
  rating: number;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  imgUrl,
  name,
  reviewText,
  rating,
}) => {
  return (
    <blockquote className="bg-secondary-background p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <img
          alt={name}
          src={imgUrl}
          className="size-14 rounded-full object-cover"
        />

        <div>
          <div className="">
            <Rating value={rating} />
          </div>

          <p className="mt-0.5 text-lg font-medium text-primary-text">{name}</p>
        </div>
      </div>

      <p className="mt-4 text-secondary-text">{reviewText}</p>
    </blockquote>
  );
};

export default ReviewItem;
