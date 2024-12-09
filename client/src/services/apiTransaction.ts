import handleApiRequest from "../utils/handleApiRequest";
import api from "./api";

// Create a new transaction (Admin only)
export async function createTransaction(transactionData: any) {
  const response = await handleApiRequest(
    api.post("/transactions", transactionData)
  );
  return response.data.data;
}

// Get all transactions (Admin only)
export async function getAllTransactions(queryParams?: Record<string, any>) {
  const response = await handleApiRequest(
    api.get("/transactions", { params: queryParams })
  );
  return response.data.data;
}

// Get details of a specific transaction (Admin only)
export async function getTransactionDetails(transactionId: string) {
  const response = await handleApiRequest(
    api.get(`/transactions/${transactionId}`)
  );
  return response.data.data;
}

// Update a transaction (Admin only)
export async function updateTransaction({
  transactionId,
  updatedTransaction,
}: {
  transactionId: string;
  updatedTransaction: any;
}) {
  const response = await handleApiRequest(
    api.patch(`/transactions/${transactionId}`, updatedTransaction)
  );
  return response.data.data;
}

// Delete a transaction (Admin only)
export async function deleteTransaction(transactionId: string) {
  const response = await handleApiRequest(
    api.delete(`/transactions/${transactionId}`)
  );
  return response.data.data;
}
