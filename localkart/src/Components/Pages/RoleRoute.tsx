// src/Components/Pages/RoleRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const RoleRoute = ({ allowedRoles }) => {
  const { currentUser } = useAuth();
  const role = currentUser?.role || localStorage.getItem("role");

  if (role && allowedRoles.includes(role.toLowerCase())) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default RoleRoute;
