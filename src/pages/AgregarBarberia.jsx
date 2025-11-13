import { useForm } from "react-hook-form";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { addBarberia } from "../features/slices/barberia.slice";
import { useState } from "react";

export const AgregarBarberia = () => {
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("error");
  const dispatch = useDispatch();

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isValid, isSubmitting } 
  } = useForm({ 
    mode: "onChange"  // Validación en tiempo real como en el Login
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/barberia", data);
      
      if (response.status === 200 || response.status === 201) {
        dispatch(addBarberia(response.data.barberia));
        setTipoMensaje("success");
        setMensaje("Barbería agregada con éxito ✅");
        
        // Limpiar formulario después de éxito
        setTimeout(() => {
          reset();
          setMensaje("");
        }, 2000);
      } else {
        setTipoMensaje("error");
        setMensaje("Error al agregar la barbería. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error agregando barbería:", error);
      setTipoMensaje("error");
      setMensaje(
        "Error al agregar barbería. " +
        (error.response?.data?.message || "Error inesperado.")
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-slate-900/80 border border-slate-700 rounded-2xl shadow-2xl shadow-sky-500/20 p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            Configurar barbería
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Registra la información principal de tu barbería. Solo puede existir
            una barbería por cuenta.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* NOMBRE */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-100">
              Nombre de la barbería
            </label>
            <input
              {...register("nombre", {
                required: "El nombre de la barbería es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres",
                },
              })}
              placeholder="Ej. Barbería Central"
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
            />
            {errors.nombre && (
              <p className="text-red-400 text-xs mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>

          {/* DIRECCIÓN */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-100">
              Dirección
            </label>
            <input
              {...register("direccion", {
                required: "La dirección es requerida",
                minLength: {
                  value: 10,
                  message: "La dirección debe tener al menos 10 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "La dirección no puede exceder los 100 caracteres",
                },
              })}
              placeholder="Ej. Av. Principal 1234, Montevideo"
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
            />
            {errors.direccion && (
              <p className="text-red-400 text-xs mt-1">
                {errors.direccion.message}
              </p>
            )}
          </div>

          {/* TELÉFONO */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-100">
              Teléfono de contacto
            </label>
            <input
              {...register("telefono", {
                required: "El teléfono es requerido",
                pattern: {
                  value: /^[\+]?[0-9\s\-\(\)]+$/,
                  message: "Formato de teléfono inválido",
                },
                minLength: {
                  value: 8,
                  message: "El teléfono debe tener al menos 8 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "El teléfono no puede exceder los 20 caracteres",
                },
              })}
              placeholder="Ej. +598 091 234 567"
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
            />
            {errors.telefono && (
              <p className="text-red-400 text-xs mt-1">
                {errors.telefono.message}
              </p>
            )}
          </div>

          {/* MENSAJE DE ESTADO */}
          {mensaje && (
            <div className={`text-center text-sm ${
              tipoMensaje === "success" ? "text-emerald-400" : "text-red-400"
            }`}>
              {mensaje}
            </div>
          )}

          {/* BOTÓN */}
          <div className="pt-2">
            <button
              disabled={!isValid || isSubmitting}
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/60 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-md shadow-sky-500/30 transition-colors"
            >
              {isSubmitting ? "Guardando..." : "Guardar barbería"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};