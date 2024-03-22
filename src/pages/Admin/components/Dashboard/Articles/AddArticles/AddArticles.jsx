import SideBar from "../../../SideBar/SideBar";
import "./addArticles.scss";

const AddArticles = () => {
  return (
    <div className="addArticles">
      <SideBar />

      <div className="rightSide">
        <h1>Add Articles</h1>

        <div style={{ height: "400px" }}></div>
      </div>
    </div>
  );
};

export default AddArticles;
