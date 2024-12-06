import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

// Fetch all categories
export async function getAllCategories(queryParams?: Record<string, any>) {
  const response = await handleApiRequest(
    api.get("/categories", { params: queryParams })
  );
  return response.data.data;
}

// Fetch a single category by ID
export async function getCategory(categoryId: string) {
  const response = await handleApiRequest(api.get(`/categories/${categoryId}`));
  return response.data.data;
}

// Create a new category
export async function createCategory(newCategory: any) {
  const response = await handleApiRequest(api.post("/categories", newCategory));
  return response.data.data;
}

// Update an existing category
export async function updateCategory({
  categoryId,
  updatedCategory,
}: {
  categoryId: string;
  updatedCategory: any;
}) {
  const response = await handleApiRequest(
    api.patch(`/categories/${categoryId}`, updatedCategory)
  );
  return response.data.data;
}

// Delete a category
export async function deleteCategory(categoryId: string) {
  const response = await handleApiRequest(
    api.delete(`/categories/${categoryId}`)
  );
  return response.data.data;
}
