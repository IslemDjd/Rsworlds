import "./overview.scss";
import SideBar from "../../SideBar/SideBar";

const Overview = () => {
  return (
    <div className="overview">
      <SideBar />
      
      <div className="rightSide">
        <h1>Overview</h1>

        <div style={{ height: "400px" }}></div>
      </div>
    </div>
  );
};

export default Overview;
