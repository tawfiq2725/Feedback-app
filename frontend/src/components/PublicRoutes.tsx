// components/PublicRoute.tsx

import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/store";
import { JSX } from "react";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useUserStore();

  return isAuthenticated ? <Navigate to="/auth/dashboard" replace /> : children;
};

export default PublicRoute;
