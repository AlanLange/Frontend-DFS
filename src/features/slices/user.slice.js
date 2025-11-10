import { createSlice } from "@reduxjs/toolkit";

const storedLogged = localStorage.getItem("logged") === "true";

const initialState = {
    logged: storedLogged
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
    }
  },
});

export const { loguear, desloguear } = userSlice.actions;

export default userSlice.reducer;

