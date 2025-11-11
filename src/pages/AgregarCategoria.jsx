import { useForm } from "react-hook-form";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategoria,
  inicializecategorias,
} from "../features/slices/categorias.slice";
import { useEffect, useState } from "react";

export const AgregarCategoria = () => {
  const { categoria } = useSelector((state) => state.categoria);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const [feedback, setFeedback] = useState({ type: null, message: "" });

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

  // limpiar feedback luego de unos segundos
  useEffect(() => {
    if (!feedback.message) return;
    const timer = setTimeout(
      () => setFeedback({ type: null, message: "" }),
      3500
    );
    return () => clearTimeout(timer);
  }, [feedback]);

  const onSubmit = (data) => {
    api
      .post("/categorias", data)
      .then((res) => {
        dispatch(addCategoria(res.data.categoria));
        setFeedback({
          type: "success",
          message: "Categoría agregada con éxito.",
        });
        reset();
      })
      .catch((err) => {
        console.log(err);
        setFeedback({
          type: "error",
          message: "Error al agregar la categoría. Intenta nuevamente.",
        });
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-slate-900/80 border border-slate-700 rounded-2xl shadow-2xl shadow-sky-500/20 p-6 md:p-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Gestionar categorías
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Crea y administra las categorías de servicios de tu barbería.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 bg-slate-900/70 border border-slate-700 rounded-xl p-4 md:p-5"
          >
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-100">
                Nombre de la categoría
              </label>
              <input
                {...register("nombre")}
                placeholder="Ej. Corte, Barba, Paquete completo..."
                className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
              />
            </div>

            {feedback.message && (
              <p
                className={`text-xs mt-1 ${
                  feedback.type === "success"
                    ? "text-emerald-300"
                    : "text-red-300"
                }`}
              >
                {feedback.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-md shadow-sky-500/30 transition-colors"
            >
              Agregar categoría
            </button>
          </form>

          {/* Listado de categorías */}
          <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 md:p-5">
            <h2 className="text-sm font-semibold text-slate-100 mb-3">
              Categorías existentes
            </h2>

            {categoria && categoria.length > 0 ? (
              <ul className="max-h-64 overflow-y-auto space-y-1">
                {categoria.map((cat) => (
                  <li
                    key={cat._id}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100"
                  >
                    <span>{cat.nombre}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">
                Todavía no hay categorías creadas. Agrega la primera usando el
                formulario de la izquierda.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
