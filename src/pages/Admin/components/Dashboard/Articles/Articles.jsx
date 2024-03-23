import SideBar from "../../SideBar/SideBar";
import "./articles.scss";
import { RxUpdate } from "react-icons/rx";
import { TiDeleteOutline } from "react-icons/ti";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { changePage } from "../../../../../features/AdminPage";

const Articles = () => {
  const dispatch = useDispatch();
  // const activePage = useSelector((state) => state.page.value);


  return (
    <div className="adminArticles">
      <SideBar />
      <div className="rightSide">
        <h1 className="pageTitle">Articles</h1>
        <div className="articlesActions">
          <div
            className="actionCard"
            onClick={() => {
              dispatch(changePage("AddArticles"));
            }}
          >
            <IoAddCircleOutline className="icon" />
            <h1>Add Articles</h1>
          </div>
          <div
            className="actionCard"
            onClick={() => {
              dispatch(changePage("DeleteArticles"));
            }}
          >
            <TiDeleteOutline className="icon" />
            <h1>Delete Articles</h1>
          </div>
          <div
            className="actionCard"
            onClick={() => {
              dispatch(changePage("UpdateArticles"));
            }}
          >
            <RxUpdate className="icon" />
            <h1>Update Articles</h1>
          </div>
        </div>

        <div style={{ height: "300px" }}></div>
      </div>
    </div>
  );
};

export default Articles;
