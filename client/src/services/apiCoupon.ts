import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

// Fetch all coupons
export async function getAllCoupons() {
  const response = await handleApiRequest(api.get("/coupons"));
  return response.data.data;
}

// Fetch a single coupon by ID
export async function getCouponDetails(couponId: string) {
  const response = await handleApiRequest(api.get(`/coupons/${couponId}`));
  return response.data.data;
}

// Create a new coupon
export async function createCoupon(newCoupon: any) {
  const response = await handleApiRequest(api.post("/coupons", newCoupon));
  return response.data.data;
}

// Update an existing coupon
export async function updateCoupon({
  couponId,
  updatedCoupon,
}: {
  couponId: string;
  updatedCoupon: any;
}) {
  const response = await handleApiRequest(
    api.patch(`/coupons/${couponId}`, updatedCoupon)
  );
  return response.data.data;
}

// Delete a coupon
export async function deleteCoupon(couponId: string) {
  const response = await handleApiRequest(api.delete(`/coupons/${couponId}`));
  return response.data.data;
}
