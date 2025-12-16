import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const isLogin = localStorage.getItem("isLogin");
  const token = localStorage.getItem("token");
  return isLogin && token ? children : <Navigate to="/login" replace />;
}
