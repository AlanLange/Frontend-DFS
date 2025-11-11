// src/pages/CrearServicio.jsx
import { useForm } from "react-hook-form";
import api from "../api/api";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { addServicio } from "../features/slices/servicios.slice";
import { useDispatch, useSelector } from "react-redux";
import { inicializecategorias } from "../features/slices/categorias.slice";
import Upload from "../components/Upload";

export const CrearServicio = () => {
  const { register, handleSubmit, setValue, watch } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categorias = useSelector((state) => state.categoria);

  const urlImage = watch("urlImage");

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
    if (!data.urlImage) {
      alert("Debes subir una imagen para el servicio antes de crearlo");
      return;
    }

    const servicioData = {
      ...data,
      precio: Number(data.precio),
      ...(!data.createdAt
        ? { createdAt: new Date().toISOString() }
        : { createdAt: new Date(data.createdAt).toISOString() }),
    };

    api
      .post("/servicios", servicioData)
      .then((res) => {
        dispatch(addServicio(res.data.servicio));
        navigate("/ver-servicios");
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        if (msg === "Límite de servicios alcanzado para el plan Plus") {
          alert("Límite de servicios alcanzado para el plan Plus");
        } else {
          alert("Error al crear el servicio " + (msg || ""));
        }
        console.log(err.response);
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-slate-900/80 border border-slate-700 rounded-2xl shadow-2xl shadow-sky-500/20 p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            Crear nuevo servicio
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Completa la información del servicio y añade una imagen atractiva
            para mostrar en tu barbería.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna izquierda: Upload + preview final */}
          <div className="space-y-4">
            <Upload
              onUploaded={(url) => {
                setValue("urlImage", url, { shouldValidate: true });
              }}
            />

            {/* Preview final de la imagen que se envía en el formulario */}
            {urlImage && (
              <div className="mt-2">
                <p className="text-xs text-slate-300 mb-2">
                  Imagen seleccionada para este servicio:
                </p>
                <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/80">
                  <img
                    src={urlImage}
                    alt="Servicio"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha: formulario */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-5"
          >
            {/* Campo oculto con la URL de Cloudinary */}
            <input type="hidden" {...register("urlImage")} />

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-100">
                Nombre del servicio
              </label>
              <input
                {...register("nombre")}
                placeholder="Ej. Corte clásico, Afeitado con toalla caliente"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-100">
                Descripción
              </label>
              <textarea
                {...register("descripcion")}
                rows={3}
                placeholder="Describe brevemente el servicio, qué incluye, a quién va dirigido..."
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
                {categorias.categoria &&
                  categorias.categoria.map((categoria) => (
                    <option key={categoria._id} value={categoria._id}>
                      {categoria.nombre}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-100">
                Fecha de creación (opcional)
              </label>
              <input
                type="date"
                {...register("createdAt")}
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-md shadow-sky-500/30 transition-colors"
              >
                Crear servicio
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
