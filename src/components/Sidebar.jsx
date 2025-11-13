import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false); // estado para el menú mobile

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const closeMobileMenu = () => setIsOpen(false);

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-50">BarberApp</h1>
          <p className="text-[11px] text-slate-400">Panel de administración</p>
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
              onClick={closeMobileMenu}
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
          onClick={() => {
            closeMobileMenu();
            handleLogout();
          }}
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
    </>
  );

  return (
    <>
      {/* TOP BAR MOBILE */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-slate-950 border-b border-slate-800 px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-[11px] font-bold shadow-md shadow-sky-500/40">
            BA
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-50">BarberApp</p>
            <p className="text-[11px] text-slate-400">Panel de administración</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg p-2 border border-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
          aria-label="Abrir menú"
        >
          <span className="sr-only">Abrir menú</span>
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-slate-100 transition-transform ${
                isOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-100 transition-opacity ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-100 transition-transform ${
                isOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* OVERLAY MOBILE */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* DRAWER MOBILE */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800 text-slate-100 shadow-xl shadow-slate-900/60 transform transition-transform duration-200 md:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      {/* ESPACIADOR DESKTOP */}
      <div className="hidden md:block w-64 flex-shrink-0" aria-hidden="true" />

      {/* SIDEBAR DESKTOP FIJO */}
      <div className="hidden md:flex md:fixed md:left-0 md:top-0 md:h-screen md:w-64 md:bg-slate-950 md:border-r md:border-slate-800 md:text-slate-100 md:flex-col md:shadow-xl md:shadow-slate-900/60 md:z-40">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
