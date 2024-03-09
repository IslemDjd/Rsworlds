import Button from "../../components/button/Button";
import "./home.scss";
import icon from "../../assets/dressIcon.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>This Is Home Page</h1>
      {/* <a href="/articles"></a> */}

      <Button
        image={icon}
        width="200px"
        margin="0 auto"
        text={<Link to="/articles">See Articles</Link>}
      />
      <div style={{ height: "400px" }}></div>
    </>
  );
};

export default Home;
