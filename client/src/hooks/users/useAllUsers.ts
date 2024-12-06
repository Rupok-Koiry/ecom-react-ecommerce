import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiUsers";
import { useSearchParams } from "react-router-dom";

export function useAllUsers() {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["allUsers", queryParams],
    queryFn: () => getAllUsers(queryParams),
    retry: false,
  });

  return { isLoading, users, error };
}
