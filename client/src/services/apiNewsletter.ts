import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

// Fetch all newsletters
export async function getAllNewsletters() {
  const response = await handleApiRequest(api.get("/newsletters"));
  return response.data.data;
}

// Fetch a single newsletter by ID
export async function getNewsletterDetails(newsletterId: string) {
  const response = await handleApiRequest(
    api.get(`/newsletters/${newsletterId}`)
  );
  return response.data.data;
}

// Create a new newsletter
export async function createNewsletter(newNewsletter: any) {
  const response = await handleApiRequest(
    api.post("/newsletters", newNewsletter)
  );
  return response.data.data;
}

// Update an existing newsletter
export async function updateNewsletter({
  newsletterId,
  updatedNewsletter,
}: {
  newsletterId: string;
  updatedNewsletter: any;
}) {
  const response = await handleApiRequest(
    api.patch(`/newsletters/${newsletterId}`, updatedNewsletter)
  );
  return response.data.data;
}

// Delete a newsletter
export async function deleteNewsletter(newsletterId: string) {
  const response = await handleApiRequest(
    api.delete(`/newsletters/${newsletterId}`)
  );
  return response.data.data;
}
