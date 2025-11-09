import { configureStore } from "@reduxjs/toolkit";
import  servicioSlice  from "../features/slices/servicios.slice";
import  categoriaslice  from "../features/slices/categorias.slice";
import userReducer from "../features/user.slice";

export const store = configureStore({
  reducer: {
    servicio: servicioSlice,
    categoria: categoriaslice,
    user: userReducer
  },
});
