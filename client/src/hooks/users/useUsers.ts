import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiUsers";
export function useUsers() {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    retry: false,
  });

  return { isLoading, users, error };
}
