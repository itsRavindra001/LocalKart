// src/Components/Pages/RoleRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

type RoleRouteProps = {
  allowedRoles: string[];
};

const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles }) => {
  const { userInfo } = useAuth(); // from AuthContext
  const role = userInfo?.role || localStorage.getItem("role");

  if (role && allowedRoles.includes(role.toLowerCase())) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default RoleRoute;
