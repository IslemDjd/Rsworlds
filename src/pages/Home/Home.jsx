import Button from "../../components/button/Button";
import "./home.scss";
import icon from "../../assets/dressIcon.svg";
import { Link } from "react-router-dom";
import Local from "../../components/Local";
// import ArticleLoader from "../../loaders/ArticleLoader";

const Home = () => {
  return (
    <>
      <h1>This Is Home Page</h1>
      {/* <a href="/articles"></a> */}
      <Link to="/articles">
        <Button
          image={icon}
          width="200px"
          margin="0 auto"
          text="See Articles"
        />
      </Link>
      {/* <ArticleLoader/> */}

      <Local/>
      <div style={{ height: "400px" }}></div>
    </>
  );
};

export default Home;
