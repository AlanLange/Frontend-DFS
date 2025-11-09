import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoria: [
  ]
};

export const categoriaslice = createSlice({
  name: "categoria",
  initialState,
  reducers: {
    inicializecategorias: (state, action) => {
      state.categoria = action.payload;
    },
    addCategoria: (state, action) => {
      console.log(action.payload);
      state.categoria.push(action.payload);
    }
  },
});

export const { addCategoria, inicializecategorias } = categoriaslice.actions;
export default categoriaslice.reducer;
