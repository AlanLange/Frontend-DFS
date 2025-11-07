import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  servicio: [
  ]
};

export const servicioSlice = createSlice({
  name: "servicio",
  initialState,
  reducers: {
    inicializeServicios: (state, action) => {
      state.servicio = action.payload;
    },
   addServicio: (state, action) => {
      state.servicio.push(action.payload);
    },
    removeServicio: (state, action) => {
      state.servicio = state.servicio.filter(servicio => servicio._id !== action.payload);
    }
  },
});

export const { addServicio, inicializeServicios, removeServicio } = servicioSlice.actions;
export default servicioSlice.reducer;
