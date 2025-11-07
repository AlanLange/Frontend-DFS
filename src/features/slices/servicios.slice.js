import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  servicio: {
    id: null
  }
};

export const servicioSlice = createSlice({
  name: "servicio",
  initialState,
  reducers: {
   setId: (state, action) => {
      state.servicio.id = action.payload;
    }
  },
});

export const { setId } = servicioSlice.actions;
export default servicioSlice.reducer;
