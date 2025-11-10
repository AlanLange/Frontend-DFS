

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    barberia: []
}

export const barberiaSlice = createSlice({
  name: "barberia",
  initialState,
  reducers: {
    initializeBarberia: (state, action) => {
      state.barberia = action.payload;
    },
    
    addBarberia: (state, action) => {
      state.barberia.push(action.payload);
    }

  },
});

export const { initializeBarberia, addBarberia } = barberiaSlice.actions;

export default barberiaSlice.reducer;
