import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { inicializecategorias } from "../features/slices/categorias.slice";
import Upload from "../components/Upload";

// 🔹 Helper: resuelve URL Cloudinary o estática de Express
const resolveImageUrl = (rawUrl) => {
  if (!rawUrl) return null;

  // Ya es una URL absoluta (Cloudinary u otra)
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
    return rawUrl;
  }

  // Es relativa → la sirve tu backend con express.static
  const apiBase = api.defaults.baseURL || "";
  const backendBase = apiBase.replace(/\/v1\/?$/, "");
  const normalizedPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;

  return `${backendBase}${normalizedPath}`;
};

export const EditarServicios = () => {
  const { id } = useParams();

  const [servicio, setServicio] = useState(null);
  const [loadingServicio, setLoadingServicio] = useState(true);

  const { categoria: categoriasState } = useSelector((state) => state.categoria);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, watch } = useForm();

  const urlImageForm = watch("urlImage");

  // Imagen actual resuelta (si hay en form, usa esa; si no, la de DB)
  const currentImageUrl = resolveImageUrl(
    urlImageForm || (servicio && servicio.urlImage)
  );

  // Cargar servicio a editar
  useEffect(() => {
    setLoadingServicio(true);
    api
      .get(`/servicios/${id}`)
      .then((res) => {
        const serv = res.data.servicio;
        setServicio(serv);

        // Setear valores iniciales del form
        setValue("nombre", serv.nombre || "");
        setValue("descripcion", serv.descripcion || "");
        setValue("precio", serv.precio || "");
        setValue("categoria", serv.categoria || "");
        setValue("duracion", serv.duracion || "");
        setValue(
          "createdAt",
          serv.createdAt
            ? new Date(serv.createdAt).toISOString().slice(0, 10)
            : ""
        );
        setValue("urlImage", serv.urlImage || "");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoadingServicio(false));
  }, [id, setValue]);

  // Cargar categorías
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

  const onSubmit = (data) => {
    const payload = { ...data };

    // Normalizar precio
    if (payload.precio) {
      payload.precio = Number(payload.precio);
    }

    // Convertir fecha (yyyy-mm-dd) a ISO si viene del input
    if (payload.createdAt) {
      try {
        payload.createdAt = new Date(payload.createdAt).toISOString();
      } catch (e) {
        console.log("Error convirtiendo fecha", e);
      }
    }

    api
      .patch(`/servicios/${id}`, payload)
      .then(() => {
        navigate("/ver-servicios");
      })
      .catch((err) => {
        alert("Error al editar el servicio");
        console.log(err);
      });
  };

  if (loadingServicio) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-300 text-sm">Cargando servicio...</p>
      </div>
    );
  }

  if (!servicio) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md bg-slate-900/80 border border-slate-700 rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold text-slate-50 mb-2">
            No se encontró el servicio
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            Asegúrate de seleccionar un servicio válido desde la lista.
          </p>
          <button
            onClick={() => navigate("/ver-servicios")}
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-md shadow-sky-500/30 transition-colors"
          >
            Volver a servicios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-slate-900/80 border border-slate-700 rounded-2xl shadow-2xl shadow-sky-500/20 p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            Editar servicio
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Modifica la información del servicio y actualiza su imagen si es
            necesario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna izquierda: imagen actual + Upload */}
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-300 mb-2">Imagen actual:</p>
              {currentImageUrl ? (
                <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/80">
                  <img
                    src={currentImageUrl}
                    alt={servicio.nombre}
                    className="w-full h-52 object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-52 rounded-xl border border-slate-700 bg-slate-800 flex items-center justify-center text-xs text-slate-400">
                  Sin imagen
                </div>
              )}
            </div>

            <div className="pt-2">
              <Upload
                onUploaded={(url) => {
                  setValue("urlImage", url, { shouldValidate: true });
                }}
              />
            </div>
          </div>

          {/* Columna derecha: formulario de edición */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-5"
          >
            {/* Campo oculto para la URL de la imagen */}
            <input type="hidden" {...register("urlImage")} />

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-100">
                Nombre del servicio
              </label>
              <input
                {...register("nombre")}
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
                placeholder="Nombre del servicio"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-100">
                Descripción
              </label>
              <textarea
                {...register("descripcion")}
                rows={3}
                placeholder="Describe el servicio..."
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-100">
                  Precio
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                    $
                  </span>
                  <input
                    {...register("precio")}
                    placeholder="Ej. 500"
                    className="w-full pl-7 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-100">
                  Duración (minutos)
                </label>
                <input
                  {...register("duracion")}
                  placeholder="Ej. 30"
                  className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-100">
                Categoría
              </label>
              <select
                {...register("categoria")}
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="">Seleccione una categoría</option>
                {categoriasState &&
                  categoriasState.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.nombre}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-100">
                Fecha de creación
              </label>
              <input
                type="date"
                {...register("createdAt")}
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-md shadow-sky-500/30 transition-colors"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                onClick={() => navigate("/ver-servicios")}
                className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-medium border border-slate-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
