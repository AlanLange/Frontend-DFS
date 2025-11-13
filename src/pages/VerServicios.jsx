import { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  inicializeServicios,
  removeServicio,
} from "../features/slices/servicios.slice";
import { inicializecategorias } from "../features/slices/categorias.slice";
import { X, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

// 🔹 Helper para resolver la URL de la imagen (Cloudinary + estática Express)
const resolveImageUrl = (rawUrl) => {
  if (!rawUrl) return null;

  // Ya es absoluta (Cloudinary u otra)
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
    return rawUrl;
  }

  // Es relativa → la servís con express.static desde tu backend
  const apiBase = api.defaults.baseURL || "";
  const backendBase = apiBase.replace(/\/v1\/?$/, "");
  const normalizedPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;

  return `${backendBase}${normalizedPath}`;
};

// 🔹 Componente Modal de Confirmación
const ConfirmModal = ({ isOpen, onClose, onConfirm, servicio }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-red-500/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-50">
                Confirmar eliminación
              </h3>
              <p className="text-sm text-slate-400">
                Esta acción no se puede deshacer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-slate-300 mb-4">
            ¿Estás seguro de que quieres eliminar el servicio{" "}
            <span className="font-semibold text-slate-50">
              "{servicio?.nombre}"
            </span>
            ?
          </p>
          <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
            <p className="text-xs text-slate-400">
              Se eliminará permanentemente de tu barbería y no podrá recuperarse.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-medium border border-slate-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(servicio._id)}
            className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

// 🔹 Componente de Notificación
const Notification = ({ type, message, onClose }) => {
  if (!message) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
  };

  const styles = {
    success: "border-emerald-500/20 bg-emerald-500/10",
    error: "border-red-500/20 bg-red-500/10",
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border ${styles[type]} backdrop-blur-sm max-w-sm animate-in slide-in-from-right-8 duration-300`}>
      {icons[type]}
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-50">
          {type === "success" ? "Éxito" : "Error"}
        </p>
        <p className="text-xs text-slate-300">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4 text-slate-400" />
      </button>
    </div>
  );
};

export const VerServicios = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoria: categoriasState } = useSelector((state) => state.categoria);
  const servicios = useSelector((state) => state.servicio.servicio);

  const [filter, setFilter] = useState("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [servicioToDelete, setServicioToDelete] = useState(null);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    cargarServicios();
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

  const cargarServicios = () => {
    api
      .get("/servicios")
      .then((res) => {
        dispatch(inicializeServicios(res.data.servicios));
      })
      .catch((err) => {
        console.log(err);
        showNotification("error", "Error al cargar los servicios");
      });
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: "", message: "" }), 4000);
  };

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

  const openDeleteModal = (servicio) => {
    setServicioToDelete(servicio);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    setServicioToDelete(null);
  };

  const handleDelete = async (id) => {
    setLoadingStates(prev => ({ ...prev, [id]: true }));
    
    try {
      await api.delete(`/servicios/${id}`);
      dispatch(removeServicio(id));
      showNotification("success", "Servicio eliminado correctamente");
    } catch (error) {
      console.error("Error eliminando servicio:", error);
      const errorMessage = error.response?.data?.message || "Error al eliminar el servicio";
      showNotification("error", errorMessage);
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: false }));
      closeDeleteModal();
    }
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
      {/* Notificación */}
      <Notification
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ type: "", message: "" })}
      />

      {/* Modal de Confirmación */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        servicio={servicioToDelete}
      />

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
              const isLoading = loadingStates[servicio._id];

              return (
                <div
                  key={servicio._id}
                  className="flex flex-col bg-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden shadow-lg shadow-sky-500/10 transition-all hover:shadow-sky-500/20 hover:border-slate-600"
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
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => openDeleteModal(servicio)}
                      disabled={isLoading}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500/90 hover:bg-red-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Eliminando...
                        </>
                      ) : (
                        "Borrar"
                      )}
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