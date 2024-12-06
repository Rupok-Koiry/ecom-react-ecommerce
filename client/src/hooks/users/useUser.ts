import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiUsers";
import { useParams } from "react-router-dom";

export function useUser() {
  const { userId } = useParams();

  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId as string),
    retry: false,
  });

  return { isLoading, user, error };
}
