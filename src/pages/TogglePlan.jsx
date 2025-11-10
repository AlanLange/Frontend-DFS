import { useEffect, useState } from "react";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { cambiarPlan } from "../features/slices/user.slice";

export const TogglePlan = () => {
const plan = localStorage.getItem("plan");
  const [isOn, setIsOn] = useState(plan === "Premium" ? true : false);
  const dispatch = useDispatch();

  const toggle = () => {
    api
      .patch("/cliente/plan", { plan: isOn ? "Plus" : "Premium" })
      .then((res) => {
        alert("Cambiado a plan: " + res.data.plan);
        localStorage.setItem("plan", res.data.plan);
        setIsOn(!isOn);
        dispatch(cambiarPlan(res.data.plan));
      })
      .catch((err) => {
        alert(
          "No es posible cambiar el plan Plus debido a que ya tienes igual o más de 10 servicios creados"
        );
      });
  };

  return (
    <button
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
        isOn ? "bg-blue-600" : "bg-gray-300"
      }`}
      style={{ cursor: "pointer" }}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};
