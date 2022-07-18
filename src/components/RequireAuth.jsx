import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentRole, selectCurrentUser } from "../redux/slices/auth/authSlice";

const RequireAuth = ({ allowedRoles }) => {
  // const { auth } = useAuth();
  const user = useSelector(selectCurrentUser)
  const role = useSelector(selectCurrentRole)
  const location = useLocation();

  // return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
  return role == allowedRoles ?
    (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default RequireAuth;
