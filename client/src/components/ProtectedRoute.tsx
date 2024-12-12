import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useUserProfile } from "../hooks/users/useUserProfile";
type ProtectedRouteProps = {
  children: React.ReactNode;
  restrictTo?: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  restrictTo = ["user", "admin"],
}) => {
  const { isLoading, userProfile } = useUserProfile();

  if (isLoading) {
    return <Spinner className="h-screen" />;
  }
  if (!userProfile) return <Navigate to="/login" />;

  if (!restrictTo.includes(userProfile.role)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
