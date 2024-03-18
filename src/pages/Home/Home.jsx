import Button from "../../components/button/Button";
import "./home.scss";
import icon from "../../assets/dressIcon.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Link to="/articles">
        <Button
          image={icon}
          width="200px"
          margin="15rem auto"
          text="See Articles"
        />
      </Link>

      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default Home;
