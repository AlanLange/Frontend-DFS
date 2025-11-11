import { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  inicializeServicios,
  removeServicio,
} from "../features/slices/servicios.slice";
import { inicializecategorias } from "../features/slices/categorias.slice";

// 🔹 Helper para resolver la URL de la imagen (Cloudinary + estática Express)
const resolveImageUrl = (rawUrl) => {
  if (!rawUrl) return null;

  // Ya es absoluta (Cloudinary u otra)
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
    return rawUrl;
  }

  // Es relativa → la servís con express.static desde tu backend
  // Base: http://localhost:3000/v1  ->  http://localhost:3000
  const apiBase = api.defaults.baseURL || "";
  const backendBase = apiBase.replace(/\/v1\/?$/, "");

  // Aseguramos que haya una sola barra entre base y path
  const normalizedPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;

  return `${backendBase}${normalizedPath}`;
};

export const VerServicios = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoria: categoriasState } = useSelector((state) => state.categoria);
  const servicios = useSelector((state) => state.servicio.servicio);

  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    api
      .get("/servicios")
      .then((res) => {
        dispatch(inicializeServicios(res.data.servicios));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    api
      .get("/categorias")
      .then((res) => {
        dispatch(inicializecategorias(res.data.categorias));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const serviciosFiltrados = useMemo(() => {
    if (!servicios) return [];

    const now = new Date();
    return servicios.filter((serv) => {
      const createdAt = new Date(serv.createdAt);

      if (filter === "todos") return true;

      if (filter === "semana") {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return createdAt >= weekAgo;
      }

      if (filter === "mes") {
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        return createdAt >= monthAgo;
      }

      return true;
    });
  }, [servicios, filter]);

  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que quieres borrar este servicio?")) return;

    api
      .delete(`/servicios/${id}`)
      .then(() => {
        dispatch(removeServicio(id));
      })
      .catch((err) => {
        console.log(err);
        alert("Error al borrar el servicio");
      });
  };

  const handleEdit = (id) => {
    localStorage.setItem("servicioId", id);
    navigate(`/editar-servicios/${id}`);
  };

  const getCategoriaNombre = (idCategoria) => {
    if (!categoriasState) return "Sin categoría";
    const cat = categoriasState.find((c) => c._id === idCategoria);
    return cat ? cat.nombre : "Sin categoría";
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 md:px-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Servicios
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Gestiona los servicios disponibles en tu barbería.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-sm text-slate-300">
              Cantidad de servicios:{" "}
              <span className="font-semibold text-sky-400">
                {serviciosFiltrados?.length || 0}
              </span>
            </p>
            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="todos">Todos</option>
              <option value="semana">Últimos 7 días</option>
              <option value="mes">Últimos 30 días</option>
            </select>
          </div>
        </div>

        {/* Grid de servicios */}
        {serviciosFiltrados && serviciosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {serviciosFiltrados.map((servicio) => {
              const resolvedUrl = resolveImageUrl(servicio.urlImage);

              return (
                <div
                  key={servicio._id}
                  className="flex flex-col bg-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden shadow-lg shadow-sky-500/10"
                >
                  {/* Imagen */}
                  {resolvedUrl ? (
                    <img
                      src={resolvedUrl}
                      alt={servicio.nombre}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-slate-800 flex items-center justify-center text-xs text-slate-500">
                      Sin imagen
                    </div>
                  )}

                  {/* Contenido */}
                  <div className="flex-1 flex flex-col p-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-base font-semibold text-slate-50">
                        {servicio.nombre}
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-xs font-medium">
                        {getCategoriaNombre(servicio.categoria)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-3">
                      {servicio.descripcion || "Sin descripción"}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                      <div>
                        <span className="text-slate-500 block">Precio</span>
                        <span className="font-semibold">
                          $
                          {Number(servicio.precio).toLocaleString("es-UY", {
                            minimumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Duración</span>
                        <span>
                          {servicio.duracion
                            ? `${servicio.duracion} min`
                            : "No especificada"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">
                          Fecha de creación
                        </span>
                        <span>
                          {new Date(
                            servicio.createdAt
                          ).toLocaleDateString("es-UY")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-slate-800 bg-slate-900/90">
                    <button
                      onClick={() => handleEdit(servicio._id)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(servicio._id)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/90 hover:bg-red-600 text-white transition-colors"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center text-center text-slate-400">
            <p className="text-sm md:text-base">
              No hay servicios para el filtro seleccionado.
            </p>
            <p className="text-xs mt-1">
              Crea un nuevo servicio desde la sección correspondiente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
