import { configureStore } from "@reduxjs/toolkit";
import  servicioSlice  from "../features/slices/servicios.slice";

export const store = configureStore({
  reducer: {
    servicio: servicioSlice,
  },
});