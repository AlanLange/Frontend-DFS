import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, PlusCircleIcon, TagIcon, ClipboardDocumentIcon, EyeIcon, ChartBarIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-gray-100 flex flex-col shadow-lg ">
      {/* Encabezado del Sidebar */}
      <div className="p-6 text-2xl font-semibold border-b border-gray-700">
        Dashboard
      </div>

      {/* Opciones del menú */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <HomeIcon className="h-5 w-5 text-blue-400" />
          Inicio
        </Link>

        <Link
          to="/agregar-barberia"
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <PlusCircleIcon className="h-5 w-5 text-green-400" />
          Agregar Barbería
        </Link>

        <Link
          to="/agregar-categoria"
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <TagIcon className="h-5 w-5 text-yellow-400" />
          Agregar Categoría
        </Link>

        <Link
          to="/crear-servicio"
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <ClipboardDocumentIcon className="h-5 w-5 text-purple-400" />
          Crear Servicio
        </Link>

        <Link
          to="/ver-servicios"
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <EyeIcon className="h-5 w-5 text-teal-400" />
          Ver Servicios
        </Link>

        <Link
          to="/informe-uso"
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <ChartBarIcon className="h-5 w-5 text-indigo-400" />
          Informe de uso
        </Link>

        <Link
          to="/cambiar-plan"
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <CurrencyDollarIcon className="h-5 w-5 text-pink-400" />
          Cambiar Plan
        </Link>
      </nav>

      {/* Pie del Sidebar */}
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        © 2025 BarberApp
      </div>
    </div>
  );
};

export default Sidebar;
