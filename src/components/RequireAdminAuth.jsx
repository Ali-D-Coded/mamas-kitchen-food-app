import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentRole, selectCurrentToken, selectCurrentUser } from "../redux/slices/auth/authSlice";

const RequireAdminAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const token = useSelector(selectCurrentToken)
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentRole)

  const location = useLocation();
console.log(role);
  // return
  // auth?.roles?.find((role) => allowedRoles?.includes(role))
  return role == allowedRoles
    ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/admin/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAdminAuth;
