import { useState } from "react";
import api from "../api/api";

export const TogglePlan = () => {
const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    
    api.patch("/cliente/plan", { plan: isOn ? "Plus" : "Premium" })
    .then((res) => {
      alert("Cambiado a plan: " + res.data.plan);
      setIsOn(!isOn);
    })
    .catch((err) => {
      alert("No es posible cambiar el plan Plus debido a que ya tienes igual o más de 10 servicios creados");
    });
  };

  return (
    <button
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
        isOn ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
