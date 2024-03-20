import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    value: "",
  },
  reducers: {
    changePage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changePage } = pageSlice.actions;

export default pageSlice.reducer;
