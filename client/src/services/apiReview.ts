import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

// Create a new review for a product
export async function createReview(
  productId: string,
  reviewData: { rating: number; comment?: string }
) {
  const response = await handleApiRequest(
    api.post(`/reviews/${productId}`, reviewData)
  );
  return response.data.data;
}
//Get shop reviews
export async function getVendorReviews() {
  const response = await handleApiRequest(api.get(`/reviews`));
  return response.data.data;
}

// Get all reviews for a specific product
export async function getReviewsForProduct(productId: string) {
  const response = await handleApiRequest(api.get(`/reviews/${productId}`));
  return response.data.data;
}

// Update an existing review
export async function updateReview({
  reviewId,
  updatedReview,
}: {
  reviewId: string;
  updatedReview: { rating?: number; comment?: string };
}) {
  const response = await handleApiRequest(
    api.patch(`/reviews/${reviewId}`, updatedReview)
  );
  return response.data.data;
}

// Delete a review
export async function deleteReview(reviewId: string) {
  const response = await handleApiRequest(api.delete(`/reviews/${reviewId}`));
  return response.data.data;
}
