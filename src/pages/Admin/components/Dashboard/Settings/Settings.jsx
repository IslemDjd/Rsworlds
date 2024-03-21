import SideBar from "../../SideBar/SideBar";
import "./settings.scss";
const Settings = () => {
    
  return (
    <div className="settings">
      <div className="leftSide">
        <SideBar />
      </div>
      <div className="rightSide">
        <h1>Settings</h1>

        <div style={{ height: "400px" }}></div>
      </div>
    </div>
  );
};

export default Settings;
