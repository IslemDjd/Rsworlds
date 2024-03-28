import "./sideBar.scss";
import { IoMdSettings } from "react-icons/io";
import { IoLogInOutline } from "react-icons/io5";
import { GrOverview } from "react-icons/gr";
import { FaShoppingBag } from "react-icons/fa";
import { GiLargeDress } from "react-icons/gi";
import { signOut } from "firebase/auth";
import { auth } from "../../../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../../../features/AdminPage";
import { addClass } from "../../../../features/ShowSideBar";
import { useEffect } from "react";

const SideBar = () => {
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.page.value);
  const showSideBar = useSelector((state) => state.showSideBar.value);

  // console.log(activePage);

  const signout = async () => {
    await signOut(auth);
    if (window.innerWidth <= 900) {
      hideSideBar();
    }
  };

  const hideSideBar = () => {
    dispatch(
      addClass({
        hamburger: "activeHamburger",
        close: "close",
        sideBar: "sideBarHidden",
      })
    );
  };

  const handlePageChanges = (pageName) => {
    dispatch(changePage(pageName));
    if (window.innerWidth <= 900) {
      hideSideBar();
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 900) {
      dispatch(
        addClass({
          hamburger: "activeHamburger",
          close: "close",
          sideBar: "sideBarHidden",
        })
      );
    } else {
      dispatch(
        addClass({
          hamburger: "activeHamburger",
          close: "close",
          sideBar: "sideBar leftSide",
        })
      );
    }
    const handleResize = () => {
      if (window.innerWidth > 900) {
        dispatch(
          addClass({
            hamburger: "activeHamburger",
            close: "close",
            sideBar: "sideBar leftSide",
          })
        );
      } else {
        dispatch(
          addClass({
            hamburger: "activeHamburger",
            close: "close",
            sideBar: "sideBarHidden",
          })
        );
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <div className={showSideBar.sideBar}>
      <ul>
        <li
          className={activePage === "Overview" ? "active" : ""}
          onClick={() => handlePageChanges("Overview")}
        >
          <GrOverview />
          &nbsp;Overview
        </li>
        <li
          className={
            activePage === "Articles" ||
            activePage === "AddArticles" ||
            activePage === "DeleteArticles" ||
            activePage === "UpdateArticles"
              ? "active"
              : ""
          }
          onClick={() => handlePageChanges("Articles")}
        >
          <GiLargeDress />
          &nbsp;Articles
        </li>
        <ul className="subList">
          <li
            className={activePage === "AddArticles" ? "active" : ""}
            onClick={() => handlePageChanges("AddArticles")}
          >
            Add Articles
          </li>
          <li
            className={activePage === "DeleteArticles" ? "active" : ""}
            onClick={() => handlePageChanges("DeleteArticles")}
          >
            Delete Articles
          </li>
          <li
            className={activePage === "UpdateArticles" ? "active" : ""}
            onClick={() => handlePageChanges("UpdateArticles")}
          >
            Update Articles
          </li>
        </ul>
        <li
          className={activePage === "Commands" ? "active" : ""}
          onClick={() => handlePageChanges("Commands")}
        >
          <FaShoppingBag />
          &nbsp;Commands
        </li>
      </ul>

      <ul>
        <li
          className={activePage === "Settings" ? "active" : ""}
          onClick={() => handlePageChanges("Settings")}
        >
          <IoMdSettings />
          &nbsp;Settings
        </li>
        <li onClick={signout}>
          <IoLogInOutline />
          &nbsp;Log Out
        </li>
      </ul>

      <div style={{ height: "300px" }}></div>
    </div>
  );
};

export default SideBar;
