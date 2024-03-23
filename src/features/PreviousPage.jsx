import { createSlice } from "@reduxjs/toolkit";

export const previousPageSlice = createSlice({
  name: "previousPage",
  initialState: {
    value: "",
  },
  reducers: {
    setPreviousPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPreviousPage } = previousPageSlice.actions;

export default previousPageSlice.reducer;
