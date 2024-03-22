import SideBar from "../../../SideBar/SideBar";
import './deleteArticles.scss'


const DeleteArticles = () => {
  return (
    <div className="deleteArticles">
        <SideBar/>

      <div className="rightSide">
        <h1>Delete Articles</h1>

        <div style={{ height: "400px" }}></div>
      </div>
    </div>
  );
}

export default DeleteArticles