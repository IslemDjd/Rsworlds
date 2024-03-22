import { createSlice } from "@reduxjs/toolkit";

export const showSideBarSlice = createSlice({
  name: "showSideBar",
  initialState: {
    value: {
        hamburger: "activeHamburger",
        close: "close",
        sideBar: "sideBarHidden"
    },
  },
  reducers: {
    addClass: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addClass } = showSideBarSlice.actions;

export default showSideBarSlice.reducer;
