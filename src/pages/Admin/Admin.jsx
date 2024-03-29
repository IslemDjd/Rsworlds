import "./admin.scss";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../features/AdminPage";
import ArticleLoader from "../../loaders/ArticleLoader";
import LogInForm from "./components/LogInForm/LogInForm";
import Overview from "./components/Dashboard/Overview/Overview";
import Articles from "./components/Dashboard/Articles/Articles";
import Commands from "./components/Dashboard/Commands/Commands";
import Settings from "./components/Dashboard/Settings/Settings";
import AddArticles from "./components/Dashboard/Articles/AddArticles/AddArticles";
import DeleteArticles from "./components/Dashboard/Articles/DeleteArticles/DeleteArticles";
import UpdateArticles from "./components/Dashboard/Articles/UpdateArticles/UpdateArticles";

const Admin = () => {
  const page = useSelector((state) => state.page.value);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(changePage("Overview"));
      } else {
        dispatch(changePage("LogIn"));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPage = (page) => {
    switch (page) {
      case "LogIn":
        return <LogInForm />;
      case "Overview":
        return <Overview />;
      case "Articles":
        return <Articles />;
      case "Commands":
        return <Commands />;
      case "Settings":
        return <Settings />;
      case "AddArticles":
        return <AddArticles />;
      case "DeleteArticles":
        return <DeleteArticles />;
      case "UpdateArticles":
        return <UpdateArticles />;
      case "":
        return <ArticleLoader />;
    }
  };

  return <div>{renderPage(page)}</div>;
};

export default Admin;
