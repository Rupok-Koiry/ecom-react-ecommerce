import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

// Place a new order
export async function placeOrder(orderData: {
  products: any[];
  totalAmount: number;
  shippingAddress: string;
  shopId: string;
}) {
  const response = await handleApiRequest(api.post("/orders", orderData));
  return response.data.data;
}

// Get orders for the current user
export async function getUserOrders() {
  const response = await handleApiRequest(api.get("/orders"));
  return response.data.data;
}

// Get details of a specific order
export async function getOrderDetails(orderId: string) {
  const response = await handleApiRequest(api.get(`/orders/${orderId}`));
  return response.data.data;
}

// Get orders for a specific vendor shop
export async function getVendorOrders(shopId: string) {
  const response = await handleApiRequest(api.get(`/orders/vendor/${shopId}`));
  return response.data.data;
}
