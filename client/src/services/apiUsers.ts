import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

// Get User Profile
export async function getUserProfile() {
  const response = await handleApiRequest(api.get("/users/profile"));
  return response.data.data;
}

// Update User Profile
export async function updateUserProfile(profileData: any) {
  const response = await handleApiRequest(
    api.patch("/users/profile", profileData)
  );
  return response.data.data;
}

// Follow a Shop
export async function followShop(shopId: string) {
  const response = await handleApiRequest(api.post(`/users/follow/${shopId}`));
  return response.data.message;
}

// Unfollow a Shop
export async function unfollowShop(shopId: string) {
  const response = await handleApiRequest(
    api.delete(`/users/unfollow/${shopId}`)
  );
  return response.data.message;
}

// Get All Users (Admin only)
export async function getAllUsers(queryParams?: Record<string, any>) {
  const response = await handleApiRequest(
    api.get("/users", { params: queryParams })
  );
  return response.data.data;
}

// Ban a User (Admin only)
export async function banUser(userId: string) {
  const response = await handleApiRequest(api.patch(`/users/${userId}/ban`));
  return response.data.message;
}

// Delete a User (Admin only)
export async function deleteUser(userId: string) {
  const response = await handleApiRequest(api.delete(`/users/${userId}`));
  return response.data.message;
}
