// src/pages/Contenedor.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export const Contenedor = () => {
  return (
    <div className="flex min-h-screen w-full bg-slate-950">
      <Sidebar />

      {/* Área de contenido */}
      <main className="flex-1 min-h-screen bg-slate-950 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
export default Contenedor;