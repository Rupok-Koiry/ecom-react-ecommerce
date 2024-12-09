import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "../../services/apiTransaction";

export function useTransactions() {
  const {
    isLoading,
    data: transactions,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
    retry: false,
  });

  return { isLoading, transactions, error };
}
