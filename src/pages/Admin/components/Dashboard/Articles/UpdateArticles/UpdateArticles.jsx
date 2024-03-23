import SideBar from "../../../SideBar/SideBar";
import "./updateArticles.scss";

const UpdateArticles = () => {
  return (
    <div className="updateArticles">
      <SideBar />

      <div className="rightSide">
        <h1 className="pageTitle">Update Articles</h1>

        <div style={{ height: "400px" }}></div>
      </div>
    </div>
  );
};

export default UpdateArticles;
