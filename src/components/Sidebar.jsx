import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  PlusCircleIcon,
  TagIcon,
  ClipboardDocumentIcon,
  EyeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  {
    to: "/dashboard",
    label: "Inicio",
    icon: HomeIcon,
    color: "text-sky-400",
  },
  {
    to: "/agregar-barberia",
    label: "Agregar Barbería",
    icon: PlusCircleIcon,
    color: "text-emerald-400",
  },
  {
    to: "/agregar-categoria",
    label: "Agregar Categoría",
    icon: TagIcon,
    color: "text-amber-400",
  },
  {
    to: "/crear-servicio",
    label: "Crear Servicio",
    icon: ClipboardDocumentIcon,
    color: "text-violet-400",
  },
  {
    to: "/ver-servicios",
    label: "Ver Servicios",
    icon: EyeIcon,
    color: "text-teal-400",
  },
  {
    to: "/informe-uso",
    label: "Informe de uso",
    icon: ChartBarIcon,
    color: "text-indigo-400",
  },
  {
    to: "/cambiar-plan",
    label: "Cambiar Plan",
    icon: CurrencyDollarIcon,
    color: "text-pink-400",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Contenedor fantasma para mantener el espacio */}
      <div className="w-64 flex-shrink-0" aria-hidden="true" />
      
      {/* Sidebar fijo */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 text-slate-100 flex flex-col shadow-xl shadow-slate-900/60 z-40">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-50">BarberApp</h1>
            <p className="text-[11px] text-slate-400">
              Panel de administración
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-xs font-bold shadow-md shadow-sky-500/40">
            BA
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-[11px] uppercase tracking-wide text-slate-500 px-2 mb-3">
            Navegación
          </p>

          <div className="space-y-1">
            {menuItems.map(({ to, label, icon: Icon, color }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-slate-800 text-slate-50 border border-sky-500/40"
                      : "text-slate-300 hover:bg-slate-900 hover:text-slate-50 border border-transparent",
                  ].join(" ")
                }
              >
                <Icon className={`h-5 w-5 ${color}`} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer / Logout */}
        <div className="px-4 py-3 border-t border-slate-800">
          <button
            onClick={handleLogout}
            type="button"
            aria-label="Cerrar sesión"
            className="w-full inline-flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400/60 text-sm font-medium transition-shadow shadow-sm shadow-red-500/30"
          >
            Salir
          </button>
          <p className="mt-3 text-[11px] text-slate-500 text-center">
            © 2025 BarberApp
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;