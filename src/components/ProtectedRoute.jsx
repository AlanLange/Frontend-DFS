// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const logged = useSelector((state) => state.user.logged);

  if (!logged) return <Navigate to="/" replace />;

  return <Outlet />;
};
export default ProtectedRoute;