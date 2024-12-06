import { Navigate } from "react-router-dom";
import { useMe } from "../hooks/auth/useMe";
import Spinner from "./Spinner";
type ProtectedRouteProps = {
  children: React.ReactNode;
  restrictTo?: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  restrictTo = ["user", "admin"],
}) => {
  const { isLoading, user } = useMe();

  if (isLoading) {
    return <Spinner className="h-screen" />;
  }
  if (!user) return <Navigate to="/login" />;

  if (!restrictTo.includes(user.role)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
