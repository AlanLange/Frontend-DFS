import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logged: false,
    plan: "",
    username: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loguear: (state) => {
        state.logged = true;
    },
    desloguear: (state) => {
        state.logged = false;
        localStorage.removeItem("token");
    },
    cambiarPlan: (state, action) => {
        state.plan = action.payload;
    },
    setUser: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { loguear, desloguear, cambiarPlan } = userSlice.actions;

export default userSlice.reducer;

