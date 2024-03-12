import { createSlice } from "@reduxjs/toolkit";

export const cartArticleSlice = createSlice({
  name: "cartArticle",
  initialState: {
    value: {
      bucket: JSON.parse(localStorage.getItem("cartArticle")) || [],
    },
  },
  reducers: {
    addArticle: (state, action) => {
      state.value.bucket.push(action.payload);
    },
  },
});

export const { addArticle } = cartArticleSlice.actions;

export default cartArticleSlice.reducer;
