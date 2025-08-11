import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const AdminRoutes = () => {
  const { currentUser } = useAuth();
  const role = currentUser?.role || localStorage.getItem("role");

  if (role?.toLowerCase() === "admin") {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default AdminRoutes;
