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
