import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// Componente arrow que actúa como layout/protección de rutas
const ProtectedRoute = () => {

    const token = localStorage.getItem("token");

    // Si no está autenticado → redirige a login
    if (!token) return <Navigate to="/" replace />;

    // Si está autenticado → renderiza rutas hijas
    return <Outlet />;
};

export default ProtectedRoute;