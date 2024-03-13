import Button from "../../components/button/Button";
import "./home.scss";
import icon from "../../assets/dressIcon.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>This Is Home Page</h1>
      <Link to="/articles">
        <Button
          image={icon}
          width="200px"
          margin="0 auto"
          text="See Articles"
        />
      </Link>

      <div style={{ height: "400px" }}></div>
    </>
  );
};

export default Home;
