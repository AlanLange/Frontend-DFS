import { useSelector } from "react-redux";
import { TogglePlan } from "./TogglePlan";

export const CambiarPlan = () => {
  const plan = useSelector((state) => state.user.plan);

  const isPremium = plan === "Premium";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-slate-900/80 border border-slate-700 rounded-2xl shadow-2xl shadow-sky-500/20 p-6 md:p-8">
        <div className="mb-5">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
            Planes
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Cambia entre <span className="font-semibold">Plus</span> y{" "}
            <span className="font-semibold">Premium</span> según las
            necesidades de tu barbería.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {/* Estado actual */}
          <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">
                Estado actual
              </p>
              <p className="text-lg font-semibold text-slate-50 mt-1">
                {plan}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {isPremium
                  ? "Disfrutas del plan Premium con mayor flexibilidad."
                  : "Estás usando el plan Plus con límite de servicios."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold ${
                  isPremium
                    ? "bg-amber-500/10 text-amber-300 border border-amber-400/40"
                    : "bg-sky-500/10 text-sky-300 border border-sky-400/40"
                }`}
              >
                {isPremium ? "Premium activo" : "Plus activo"}
              </span>
            </div>
          </div>

          {/* Switch de cambio */}
          <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  Cambiar de plan
                </p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Usa el interruptor para alternar entre Plus y Premium. El
                  cambio se aplica inmediatamente si no superas las
                  restricciones del plan.
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                  <span className={!isPremium ? "text-sky-300" : ""}>
                    Plus
                  </span>
                  <TogglePlan />
                  <span className={isPremium ? "text-amber-300" : ""}>
                    Premium
                  </span>
                </div>
              </div>
            </div>

            {/* Descripción de planes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
              <div className="rounded-lg border border-slate-700 bg-slate-950/70 p-3">
                <p className="font-semibold text-sky-300 mb-1">Plan Plus</p>
                <ul className="text-slate-400 space-y-1 list-disc list-inside">
                  <li>Límite de 10 servicios.</li>
                  <li>Ideal para barberías pequeñas o en etapa inicial.</li>
                  <li>Control simple y directo de tu catálogo.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-950/70 p-3">
                <p className="font-semibold text-amber-300 mb-1">
                  Plan Premium
                </p>
                <ul className="text-slate-400 space-y-1 list-disc list-inside">
                  <li>Mayor flexibilidad para crecer.</li>
                  <li>Recomendado si manejas muchos servicios.</li>
                  <li>Menos restricciones en la gestión.</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-2">
            Tip: si ya tienes 10 servicios o más, no podrás volver al plan
            Plus hasta reducir la cantidad. Esto evita inconsistencias en tu
            catálogo.
          </p>
        </div>
      </div>
    </div>
  );
};
