import SideBar from "../../SideBar/SideBar";
import "./articles.scss";
const Articles = () => {
  return (
    <div className="adminArticles">
        <SideBar/>
      <div className="rightSide">
        <h1>Articles</h1>

        <div style={{ height: "400px" }}></div>
      </div>
    </div>
  );
};

export default Articles;
