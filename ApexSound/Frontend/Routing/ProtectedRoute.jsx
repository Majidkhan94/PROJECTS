import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if(!token && role != "User")
  {
    return <Navigate to="/login" replace />;
  }

  return children;

};