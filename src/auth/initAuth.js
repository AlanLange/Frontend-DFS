// src/auth/initAuth.js
import api from "../api/api.js";
import { loguear, desloguear, cambiarPlan } from "../features/slices/user.slice.js";

export const initAuth = async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return; // no hay token, no hacemos nada

  try {
    const { data } = await api.get("/validatetoken");
    // data = { valid: true, id, username, plan }

    if (data.valid) {
      dispatch(loguear());
      dispatch(cambiarPlan(data.plan)); // sincronizás plan real del backend
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("plan");
      dispatch(desloguear());
    }
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("plan");
    dispatch(desloguear());
  }
};
