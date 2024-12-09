import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";
import Cookies from "js-cookie";

// Refactored signup function using handleApiRequest
export async function signup(newUser: any) {
  const response = await handleApiRequest(api.post("/auth/signup", newUser));
  Cookies.set("token", response.data.token, { expires: 30 });
  return response.data.data;
}

// Refactored login function using handleApiRequest
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await handleApiRequest(
    api.post("/auth/signin", { email, password })
  );
  Cookies.set("token", response.data.token, { expires: 30 });
  return response.data.data;
}

// Refactored logout function using handleApiRequest
export async function logout() {
  const response = await handleApiRequest(api.get("/auth/logout"));
  Cookies.remove("token");
  return response.data;
}
export async function forgotPassword(email: string) {
  const response = await handleApiRequest(
    api.post("/auth/forgot-password", { email })
  );
  return response.data.data;
}

export async function resetPassword({
  password,
  token,
}: {
  password: string;
  token: string;
}) {
  const response = await handleApiRequest(
    api.patch(`/auth/reset-password/${token}`, { password })
  );
  return response.data.data;
}
