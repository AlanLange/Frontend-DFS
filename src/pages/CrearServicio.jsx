// src/pages/CrearServicio.jsx
import { useForm } from "react-hook-form";
import api from "../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { addServicio } from "../features/slices/servicios.slice";
import { useDispatch, useSelector } from "react-redux";
import { inicializecategorias } from "../features/slices/categorias.slice";
import Upload from "../components/Upload";

export const CrearServicio = () => {
  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch,
    formState: { errors, isValid, isSubmitting }
  } = useForm({ 
    mode: "onChange" 
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Estados para manejo de mensajes
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("error");

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

  // limpiar mensaje después de unos segundos
  useEffect(() => {
    if (!mensaje) return;
    const timer = setTimeout(() => setMensaje(""), 3500);
    return () => clearTimeout(timer);
  }, [mensaje]);

  const onSubmit = async (data) => {
    if (!data.urlImage) {
      setTipoMensaje("error");
      setMensaje("Debes subir una imagen para el servicio antes de crearlo");
      return;
    }

    const servicioData = {
      ...data,
      precio: Number(data.precio),
      duracion: Number(data.duracion),
      ...(!data.createdAt
        ? { createdAt: new Date().toISOString() }
        : { createdAt: new Date(data.createdAt).toISOString() }),
    };

    try {
      const response = await api.post("/servicios", servicioData);
      
      if (response.status === 200 || response.status === 201) {
        dispatch(addServicio(response.data.servicio));
        setTipoMensaje("success");
        setMensaje("Servicio creado con éxito ✅");
        
        setTimeout(() => {
          navigate("/ver-servicios");
        }, 1500);
      } else {
        setTipoMensaje("error");
        setMensaje("Error al crear el servicio. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error creando servicio:", error);
      setTipoMensaje("error");
      
      const msg = error.response?.data?.message;
      if (msg === "Límite de servicios alcanzado para el plan Plus") {
        setMensaje("Límite de servicios alcanzado para el plan Plus");
      } else {
        setMensaje("Error al crear el servicio. " + (msg || ""));
      }
    }
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
            <input type="hidden" {...register("urlImage", {
              required: "La imagen es requerida"
            })} />
            {errors.urlImage && (
              <p className="text-red-400 text-xs">
                {errors.urlImage.message}
              </p>
            )}

            {/* Nombre del servicio */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-100">
                Nombre del servicio
              </label>
              <input
                {...register("nombre", {
                  required: "El nombre del servicio es requerido",
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "El nombre no puede exceder los 50 caracteres",
                  },
                })}
                placeholder="Ej. Corte clásico, Afeitado con toalla caliente"
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
              />
              {errors.nombre && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            {/* Descripción */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-100">
                Descripción
              </label>
              <textarea
                {...register("descripcion", {
                  required: "La descripción es requerida",
                  minLength: {
                    value: 10,
                    message: "La descripción debe tener al menos 10 caracteres",
                  },
                  maxLength: {
                    value: 500,
                    message: "La descripción no puede exceder los 500 caracteres",
                  },
                })}
                rows={3}
                placeholder="Describe brevemente el servicio, qué incluye, a quién va dirigido..."
                className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500 resize-none"
              />
              {errors.descripcion && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.descripcion.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Precio */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-100">
                  Precio
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    {...register("precio", {
                      required: "El precio es requerido",
                      min: {
                        value: 1,
                        message: "El precio debe ser mayor a 0",
                      },
                      max: {
                        value: 10000,
                        message: "El precio no puede exceder $10,000",
                      },
                    })}
                    placeholder="Ej. 500"
                    className="w-full pl-7 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
                  />
                </div>
                {errors.precio && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.precio.message}
                  </p>
                )}
              </div>

              {/* Duración */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-100">
                  Duración (minutos)
                </label>
                <input
                  type="number"
                  {...register("duracion", {
                    required: "La duración es requerida",
                    min: {
                      value: 5,
                      message: "La duración mínima es 5 minutos",
                    },
                    max: {
                      value: 480,
                      message: "La duración máxima es 480 minutos (8 horas)",
                    },
                  })}
                  placeholder="Ej. 30"
                  className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
                />
                {errors.duracion && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.duracion.message}
                  </p>
                )}
              </div>
            </div>

            {/* Categoría */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-100">
                Categoría
              </label>
              <select
                {...register("categoria", {
                  required: "La categoría es requerida",
                })}
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
              {errors.categoria && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.categoria.message}
                </p>
              )}
            </div>

            {/* Fecha de creación */}
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

            {/* Mensaje de estado */}
            {mensaje && (
              <p className={`text-sm text-center ${
                tipoMensaje === "success" ? "text-emerald-400" : "text-red-400"
              }`}>
                {mensaje}
              </p>
            )}

            {/* Botón de envío */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!isValid || isSubmitting || !urlImage}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/60 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-md shadow-sky-500/30 transition-colors"
              >
                {isSubmitting ? "Creando servicio..." : "Crear servicio"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};