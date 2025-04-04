import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/store";

type protedRole = {
  requiredRole: string;
};
const ProtectedRoute = ({ requiredRole }: protedRole) => {
  const { isAuthenticated, role } = useUserStore((state) => state);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
