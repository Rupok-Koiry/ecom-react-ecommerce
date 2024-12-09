import { useQuery } from "@tanstack/react-query";
import { getTransactionDetails } from "../../services/apiTransaction";

export function useTransactionDetails(transactionId: string) {
  const {
    isLoading,
    data: transaction,
    error,
  } = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => getTransactionDetails(transactionId),
    retry: false,
  });

  return { isLoading, transaction, error };
}
