import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartArticleReducer from "./features/CartArticle.jsx";
import pageReducer from "./features/AdminPage.jsx";
import showSideBarReducer from "./features/ShowSideBar.jsx";
import previousPageReducer from "./features/PreviousPage.jsx";

const store = configureStore({
  reducer: {
    cartArticle: cartArticleReducer,
    page: pageReducer,
    previousPage: previousPageReducer,
    showSideBar: showSideBarReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
