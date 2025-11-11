import { useEffect, useState } from "react";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { cambiarPlan } from "../features/slices/user.slice";

export const TogglePlan = () => {
  const plan = useSelector((state) => state.user.plan);
  const [isOn, setIsOn] = useState(plan === "Premium");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: null, message: "" });

  const dispatch = useDispatch();

  // sincronizar el switch cuando el plan cambia desde Redux
  useEffect(() => {
    setIsOn(plan === "Premium");
  }, [plan]);

  // limpiar feedback automáticamente después de unos segundos
  useEffect(() => {
    if (!feedback.message) return;
    const timer = setTimeout(() => {
      setFeedback({ type: null, message: "" });
    }, 4000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const toggle = () => {
    if (loading) return;

    const nuevoPlan = isOn ? "Plus" : "Premium";

    setLoading(true);
    api
      .patch("/cliente/plan", { plan: nuevoPlan })
      .then((res) => {
        dispatch(cambiarPlan(res.data.plan));
        setFeedback({
          type: "success",
          message: `Plan actualizado a ${res.data.plan}`,
        });
      })
      .catch((err) => {
        const apiMsg = err.response?.data?.message;
        setFeedback({
          type: "error",
          message:
            apiMsg ||
            "No es posible cambiar al plan Plus. Verifica que no tengas 10 o más servicios creados.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        onClick={toggle}
        disabled={loading}
        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 border ${
          isOn
            ? "bg-sky-500 border-sky-400"
            : "bg-slate-700 border-slate-500"
        } ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            isOn ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>

      {feedback.message && (
        <p
          className={`text-[11px] mt-1 ${
            feedback.type === "success"
              ? "text-emerald-300"
              : "text-red-300"
          }`}
        >
          {feedback.message}
        </p>
      )}
    </div>
  );
};
