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
      localStorage.setItem("cartArticle", JSON.stringify(state.value.bucket));
    },
    removeArticle: (state, action) => {
      state.value.bucket = state.value.bucket.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.size === action.payload.size &&
            item.quantity === action.payload.quantity
          )
      );
      localStorage.setItem("cartArticle", JSON.stringify(state.value.bucket));
    },
    removeAllArticles: (state) => {
      state.value.bucket = [];
      localStorage.removeItem("cartArticle");
    },
  },
});

export const { addArticle, removeArticle, removeAllArticles } = cartArticleSlice.actions;

export default cartArticleSlice.reducer;
