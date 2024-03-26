import "./overview.scss";
import SideBar from "../../SideBar/SideBar";

const Overview = () => {
  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset();
  const adjustedOffsetInMs = Math.abs(timezoneOffset) * 60 * 1000;
  const localDate = new Date(currentDate.getTime() + adjustedOffsetInMs);
  const localDateString = localDate.toISOString();
  
  return (
    <div className="overview">
      <SideBar />

      <div className="rightSide">
        <h1>{adjustedOffsetInMs}</h1>
        <h1>{timezoneOffset}</h1>
        <h1>{localDateString}</h1>

        <div style={{ height: "400px" }}></div>
      </div>
    </div>
  );
};

export default Overview;
