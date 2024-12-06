import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/apiUsers";

export function useUserProfile() {
  const {
    isLoading,
    data: userProfile,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: false,
  });

  return { isLoading, userProfile, error };
}
