import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const isLogin = localStorage.getItem("isLogin");
  return isLogin ? children : <Navigate to="/login" replace />;
}
