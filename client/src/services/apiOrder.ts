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

// Get orders for a specific vendor shop
export async function getUserOrders(page?: number, limit?: number) {
  const response = await handleApiRequest(
    api.get(`/orders/users?page=${page}&limit=${limit}`)
  );
  return response.data.data;
}
// Get orders for a specific vendor shop
export async function getAllOrders() {
  const response = await handleApiRequest(api.get(`/orders`));
  return response.data.data;
}

// Get details of a specific order
export async function getOrderDetails(orderId: string) {
  const response = await handleApiRequest(api.get(`/orders/${orderId}`));
  return response.data.data;
}

// Get orders for a specific vendor shop
export async function getVendorOrders(
  shopId: string,
  page?: number,
  limit?: number
) {
  const response = await handleApiRequest(
    api.get(`/orders/vendor/${shopId}?page=${page}&limit=${limit}`)
  );
  return response.data.data;
}
