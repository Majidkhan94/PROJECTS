import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if(!token && role != "User")
  {
    return <Navigate to="/login" replace />;
  }





  // if (!token) {
  //   return <Navigate to="/admin/login" replace />;
  // }

  // if (allowedRole && role !== allowedRole) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return children;

};