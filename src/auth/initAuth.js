// src/auth/initAuth.js
import api from "../api/api.js";
import { loguear, desloguear, cambiarPlan } from "../features/slices/user.slice.js";

export const initAuth = async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return; // no hay token, no hacemos nada

    api.get("/auth/validatetoken").then(res =>{
      console.log(res.data)
      if (res.data.valid) {
        dispatch(loguear());
        dispatch(cambiarPlan(res.data.plan)); // sincronizás plan real del backend
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("plan");
        dispatch(desloguear());
      }

    }).catch(err => {
      console.log(err)
      localStorage.removeItem("token");
      localStorage.removeItem("plan");
      dispatch(desloguear());
    });
    // data = { valid: true, id, username, plan }

  
};
