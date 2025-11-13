// src/pages/Dashboard.jsx
import { useEffect, useMemo } from "react";
import { NoBarberiasCard } from "../components/NoBarberias";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { initializeBarberia } from "../features/slices/barberia.slice";
import { inicializecategorias } from "../features/slices/categorias.slice";
import { inicializeServicios } from "../features/slices/servicios.slice";

// Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#e5e7eb", // text-slate-200
      },
    },
    title: {
      display: true,
      text: "Servicios por categoría",
      color: "#e5e7eb",
      font: {
        size: 16,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#9ca3af", // text-slate-400
      },
      grid: {
        color: "rgba(55,65,81,0.4)", // slate-700
      },
    },
    y: {
      ticks: {
        color: "#9ca3af",
        precision: 0,
      },
      grid: {
        color: "rgba(55,65,81,0.4)",
      },
    },
  },
};

export const Dashboard = () => {
  const { barberia } = useSelector((state) => state.barberia);
  const { categoria } = useSelector((state) => state.categoria);
  const servicios = useSelector((state) => state.servicio.servicio);

  const dispatch = useDispatch();

  // Cargar barbería
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

  // Cargar servicios
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

  // Servicios por categoría (para la gráfica)
  const graficaData = useMemo(() => {
    if (!categoria || !servicios) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const labels = categoria.map((cat) => cat.nombre);
    const counts = categoria.map(
      (cat) =>
        servicios.filter((serv) => serv.categoria === cat._id).length || 0
    );

    return {
      labels,
      datasets: [
        {
          label: "Servicios",
          data: counts,
          backgroundColor: "rgba(56, 189, 248, 0.6)", // sky-400
          borderRadius: 6,
        },
      ],
    };
  }, [categoria, servicios]);

  if (!barberia) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <NoBarberiasCard />
      </div>
    );
  }

  const totalServicios = servicios?.length || 0;
  const totalCategorias = categoria?.length || 0;

  return (
    <div className="relative min-h-screen bg-slate-950 px-4 py-8 md:px-10 flex justify-center">
      <div className="w-full max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Resumen general de tu barbería y sus servicios.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 shadow-md shadow-sky-500/20">
            <p className="text-xs text-slate-400 mb-1 uppercase tracking-wide">
              Barbería
            </p>
            <p className="text-sm font-semibold text-slate-50">
              {barberia.nombre}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {barberia.direccion}
            </p>
            <p className="text-xs text-slate-400">
              Teléfono:{" "}
              <span className="text-sky-300 font-medium">
                {barberia.telefono}
              </span>
            </p>
          </div>
        </div>

        {/* Métricas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 p-4 shadow-lg shadow-slate-900/60">
            <div className="absolute right-0 top-0 w-20 h-20 bg-sky-500/10 rounded-bl-full pointer-events-none" />
            <p className="text-xs text-slate-400 mb-1">Servicios activos</p>
            <p className="text-3xl font-semibold text-slate-50">
              {totalServicios}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Servicios disponibles en tu barbería.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 p-4 shadow-lg shadow-slate-900/60">
            <div className="absolute right-0 top-0 w-20 h-20 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
            <p className="text-xs text-slate-400 mb-1">Categorías</p>
            <p className="text-3xl font-semibold text-slate-50">
              {totalCategorias}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Agrupa tus servicios para una mejor organización.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 p-4 shadow-lg shadow-slate-900/60">
            <div className="absolute right-0 top-0 w-20 h-20 bg-violet-500/10 rounded-bl-full pointer-events-none" />
            <p className="text-xs text-slate-400 mb-1">Resumen rápido</p>
            <p className="text-sm text-slate-300">
              Mantén tus servicios actualizados y bien categorizados para una
              mejor experiencia de tus clientes.
            </p>
          </div>
        </div>

        {/* Gráfico + panel derecho */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Gráfico */}
          <div className="lg:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-700 p-4 md:p-6 shadow-xl shadow-sky-500/20">
            {graficaData.labels.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-sm text-slate-400">
                No hay datos suficientes para mostrar la gráfica. Crea
                categorías y servicios para ver el análisis.
              </div>
            ) : (
              <Bar options={chartOptions} data={graficaData} />
            )}
          </div>

          {/* Panel lateral */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-700 p-4 md:p-6 shadow-xl shadow-slate-900/40 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-50 mb-2">
                Detalle de actividad
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                La gráfica muestra cuántos servicios tienes asignados a cada
                categoría. Úsalo para identificar categorías vacías o muy
                cargadas.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>
                  • Total de servicios:{" "}
                  <span className="font-semibold text-sky-300">
                    {totalServicios}
                  </span>
                </li>
                <li>
                  • Total de categorías:{" "}
                  <span className="font-semibold text-emerald-300">
                    {totalCategorias}
                  </span>
                </li>
                <li>
                  • Promedio de servicios por categoría:{" "}
                  <span className="font-semibold text-amber-300">
                    {totalCategorias
                      ? (totalServicios / totalCategorias).toFixed(1)
                      : 0}
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
              Tip: Si ves categorías sin servicios o con muy pocos, puedes
              ajustar tu catálogo para equilibrar mejor tu oferta y destacar los
              servicios más rentables.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
