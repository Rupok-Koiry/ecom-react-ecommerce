import { FaRegTrashCan } from "react-icons/fa6";
import Button from "./Button";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { useVendorReviews } from "../hooks/reviews/useVendorReviews";
import { useDeleteReview } from "../hooks/reviews/useDeleteReview";

const ReviewTable = () => {
  const { deleteReview } = useDeleteReview();
  const { reviews, isLoading, error } = useVendorReviews();

  if (error) return <ErrorMessage message={error.message} />;
  if (!reviews?.length && !isLoading)
    return <ErrorMessage message={"No Reviews Found"} />;

  return (
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
                  Product Name
                </th>
                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                  Comment
                </th>
                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap">
                  Rating
                </th>
                <th className="px-6 py-3 text-left tracking-wider whitespace-nowrap flex items-center gap-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary-background">
              {reviews.map((review: any, index: number) => (
                <tr
                  key={review._id}
                  className={`${
                    index % 2 === 0
                      ? "bg-secondary-background bg-opacity-20"
                      : ""
                  }`}
                >
                  <td className="pl-4">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {review.product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {review.user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {review.comment}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium uppercase`}
                    >
                      {review.rating}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                    <Button
                      className="text-sm py-2 px-2"
                      onClick={() => deleteReview(review._id)}
                    >
                      <FaRegTrashCan />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReviewTable;
