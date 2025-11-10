import { createSlice } from "@reduxjs/toolkit";

const storedLogged = localStorage.getItem("logged") === "true";

const initialState = {
    logged: storedLogged,
    plan: localStorage.getItem("plan") || "Plus"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loguear: (state) => {
        state.logged = true;
        localStorage.setItem("logged", "true");
    },
    desloguear: (state) => {
        state.logged = false;
        localStorage.removeItem("logged");
    },
    cambiarPlan: (state, action) => {
        state.plan = action.payload;
        localStorage.setItem("plan", action.payload);
    }
  },
});

export const { loguear, desloguear, cambiarPlan } = userSlice.actions;

export default userSlice.reducer;

