import { AxiosError } from "axios";

// Helper function to handle API requests
async function handleApiRequest<T>(apiCall: Promise<T>): Promise<T> {
  try {
    return await apiCall;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
    throw new Error("An unexpected error occurred.");
  }
}
export default handleApiRequest;
