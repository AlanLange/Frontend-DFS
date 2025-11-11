import { useForm } from "react-hook-form";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { addBarberia } from "../features/slices/barberia.slice";

export const AgregarBarberia = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    api
      .post("/barberia", data)
      .then((res) => {
        dispatch(addBarberia(res.data.barberia));
        alert("Barbería agregada con éxito");
        reset();
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Error al agregar la barbería. Probablemente ya exista una registrada."
        );
      });
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
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-100">
              Nombre de la barbería
            </label>
            <input
              {...register("nombre")}
              placeholder="Ej. Barbería Central"
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-100">
              Dirección
            </label>
            <input
              {...register("direccion")}
              placeholder="Ej. Av. Principal 1234, Montevideo"
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-100">
              Teléfono de contacto
            </label>
            <input
              {...register("telefono")}
              placeholder="Ej. +598 091 234 567"
              className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-md shadow-sky-500/30 transition-colors"
            >
              Guardar barbería
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
