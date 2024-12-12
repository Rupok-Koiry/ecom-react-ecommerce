import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

// Create a new shop
export async function createShop(shopData: any) {
  const response = await handleApiRequest(api.post("/shops", shopData));
  return response.data.data;
}

// Get all shops (Admin only)
export async function getVendorShop(queryParams?: Record<string, any>) {
  const response = await handleApiRequest(
    api.get("/shops", { params: queryParams })
  );
  return response.data.data;
}

// Get shop details
export async function getShopDetails(shopId: string) {
  const response = await handleApiRequest(api.get(`/shops/${shopId}`));
  return response.data.data;
}

// Update a shop
export async function updateShop({
  shopId,
  updatedShop,
}: {
  shopId: string;
  updatedShop: any;
}) {
  const response = await handleApiRequest(
    api.patch(`/shops/${shopId}`, updatedShop)
  );
  return response.data.data;
}

// Delete a shop
export async function deleteShop(shopId: string) {
  const response = await handleApiRequest(api.delete(`/shops/${shopId}`));
  return response.data.data;
}

// Get all products for a specific shop
export async function getShopProducts(
  shopId: string,
  queryParams?: Record<string, any>
) {
  const response = await handleApiRequest(
    api.get(`/shops/${shopId}/products`, { params: queryParams })
  );
  return response.data.data;
}

// Get followers of a shop
export async function getShopFollowers(shopId: string) {
  const response = await handleApiRequest(
    api.get(`/shops/${shopId}/followers`)
  );
  return response.data.data;
}

// Blacklist a shop (Admin only)
export async function blacklistShop(shopId: string) {
  const response = await handleApiRequest(
    api.patch(`/shops/${shopId}/blacklist`)
  );
  return response.data.message;
}
