import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import { inicializecategorias } from "../features/slices/categorias.slice";
import { inicializeServicios } from "../features/slices/servicios.slice";
import { initializeBarberia } from "../features/slices/barberia.slice";
import ProgressBar from "../components/ProgressBar";
import { TogglePlan } from "./TogglePlan";

export const InformeUso = () => {
  const plan = useSelector((state) => state.user.plan);

  const barberias = useSelector((state) => state.barberia.barberia);
  const { categoria } = useSelector((state) => state.categoria);
  const servicios = useSelector((state) => state.servicio.servicio);

  const dispatch = useDispatch();

  // Normalizar cantidad de barberías (por si es array u objeto)
  const barberiasCount = Array.isArray(barberias)
    ? barberias.length
    : barberias
    ? 1
    : 0;

  // Servicios últimos 7 días
  const serviciosFiltradosSemana = useMemo(() => {
    if (!servicios) return [];
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);

    return servicios.filter((serv) => {
      const createdAt = new Date(serv.createdAt);
      return createdAt >= weekAgo;
    });
  }, [servicios]);

  // Servicios últimos 30 días
  const serviciosFiltradosMes = useMemo(() => {
    if (!servicios) return [];
    const now = new Date();
    const monthAgo = new Date(now);
    monthAgo.setMonth(now.getMonth() - 1);

    return servicios.filter((serv) => {
      const createdAt = new Date(serv.createdAt);
      return createdAt >= monthAgo;
    });
  }, [servicios]);

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

  useEffect(() => {
    api
      .get("/barberia")
      .then((res) => {
        dispatch(initializeBarberia(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

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

  const totalServicios = servicios?.length || 0;

  // Si el plan Plus tiene límite de 10 servicios, esto da el porcentaje
  const progressValue =
    plan === "Plus" ? Math.min(totalServicios * 10, 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 md:px-10 flex justify-center">
      <div className="w-full max-w-5xl bg-slate-900/80 border border-slate-700 rounded-2xl shadow-2xl shadow-sky-500/20 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Informe de uso
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Visualiza cómo estás utilizando tu plan y los recursos de tu
              barbería.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">
              Plan actual
            </span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-sky-300">
                {plan}
              </span>
            </div>
            {/* Si querés permitir cambiar plan visualmente */}
            <div className="mt-1">
              <TogglePlan />
            </div>
          </div>
        </div>

        {/* Cards principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Barberías */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/80 p-4 shadow-lg shadow-slate-900/50">
            <div className="absolute right-0 top-0 w-20 h-20 bg-sky-500/10 rounded-bl-full pointer-events-none" />
            <p className="text-xs text-slate-400 mb-1">Barberías</p>
            <p className="text-3xl font-semibold text-slate-50">
              {barberiasCount}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Tu cuenta está asociada a{" "}
              {barberiasCount === 1 ? "una barbería" : "varias barberías"}.
            </p>
          </div>

          {/* Categorías */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/80 p-4 shadow-lg shadow-slate-900/50">
            <div className="absolute right-0 top-0 w-20 h-20 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
            <p className="text-xs text-slate-400 mb-1">Categorías</p>
            <p className="text-3xl font-semibold text-slate-50">
              {categoria?.length || 0}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Organiza tus servicios en categorías para una mejor gestión.
            </p>
          </div>

          {/* Servicios totales + barra plan */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/80 p-4 shadow-lg shadow-slate-900/50">
            <div className="absolute right-0 top-0 w-20 h-20 bg-violet-500/10 rounded-bl-full pointer-events-none" />
            <p className="text-xs text-slate-400 mb-1">Servicios totales</p>
            <p className="text-3xl font-semibold text-slate-50">
              {totalServicios}
            </p>

            {plan === "Plus" && (
              <div className="mt-3">
                <p className="text-[11px] text-slate-400 mb-1">
                  Uso del plan Plus (máx. 10 servicios)
                </p>
                <div className="w-full">
                  <ProgressBar progressValue={progressValue} />
                </div>
                <p className="text-[11px] text-slate-500 mt-1 text-right">
                  {totalServicios}/10 servicios
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sección de actividad temporal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          <div className="rounded-xl bg-slate-900/80 border border-slate-700 p-4 shadow-md shadow-slate-900/60">
            <p className="text-sm font-semibold text-slate-50 mb-1">
              Actividad reciente
            </p>
            <p className="text-xs text-slate-400 mb-4">
              Nuevos servicios creados en los últimos períodos.
            </p>

            <div className="space-y-4">
              {/* Última semana */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-400">
                    Servicios últimos 7 días
                  </p>
                  <p className="text-xl font-semibold text-slate-50">
                    {serviciosFiltradosSemana.length}
                  </p>
                </div>
                <div className="flex-1 max-w-[60%]">
                  
                </div>
              </div>

              {/* Último mes */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-400">
                    Servicios últimos 30 días
                  </p>
                  <p className="text-xl font-semibold text-slate-50">
                    {serviciosFiltradosMes.length}
                  </p>
                </div>
                <div className="flex-1 max-w-[60%]">
                  
                </div>
              </div>
            </div>
          </div>

          {/* Resumen textual / consejos */}
          <div className="rounded-xl bg-slate-900/80 border border-slate-700 p-4 shadow-md shadow-slate-900/60 flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-50 mb-1">
                Resumen de uso
              </p>
              <p className="text-xs text-slate-400 mb-3">
                Una vista rápida de cómo estás aprovechando tu plan.
              </p>

              <ul className="text-xs text-slate-300 space-y-2">
                <li>
                  • Has creado{" "}
                  <span className="font-semibold text-sky-300">
                    {totalServicios}
                  </span>{" "}
                  servicios en total.
                </li>
                <li>
                  • En la última semana agregaste{" "}
                  <span className="font-semibold text-emerald-300">
                    {serviciosFiltradosSemana.length}
                  </span>{" "}
                  servicios nuevos.
                </li>
                <li>
                  • En el último mes agregaste{" "}
                  <span className="font-semibold text-emerald-300">
                    {serviciosFiltradosMes.length}
                  </span>{" "}
                  servicios.
                </li>
                {plan === "Plus" && (
                  <li>
                    • Te quedan{" "}
                    <span className="font-semibold text-amber-300">
                      {Math.max(10 - totalServicios, 0)}
                    </span>{" "}
                    servicios disponibles en tu plan Plus antes de alcanzar el
                    límite.
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
              Tip: mantener tus servicios y categorías organizados ayuda a tus
              clientes a encontrar rápidamente lo que buscan y mejora la
              gestión del negocio.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
