import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

// Create a new product
export async function createProduct(newProduct: any) {
  const response = await handleApiRequest(api.post("/products", newProduct));
  return response.data.data;
}

// Get all products
export async function getAllProducts(queryParams?: Record<string, any>) {
  const response = await handleApiRequest(
    api.get("/products", { params: queryParams })
  );
  return response.data.data;
}

// Get details of a specific product
export async function getProductDetails(productId: string) {
  const response = await handleApiRequest(api.get(`/products/${productId}`));
  return response.data.data;
}

// Update an existing product
export async function updateProduct({
  productId,
  updatedProduct,
}: {
  productId: string;
  updatedProduct: any;
}) {
  const response = await handleApiRequest(
    api.patch(`/products/${productId}`, updatedProduct)
  );
  return response.data.data;
}

// Delete a product
export async function deleteProduct(productId: string) {
  const response = await handleApiRequest(api.delete(`/products/${productId}`));
  return response.data.data;
}

// Duplicate a product
export async function duplicateProduct(productId: string) {
  const response = await handleApiRequest(
    api.post(`/products/${productId}/duplicate`)
  );
  return response.data.data;
}

// Get reviews for a specific product
export async function getProductReviews(productId: string) {
  const response = await handleApiRequest(
    api.get(`/products/${productId}/reviews`)
  );
  return response.data.data;
}
