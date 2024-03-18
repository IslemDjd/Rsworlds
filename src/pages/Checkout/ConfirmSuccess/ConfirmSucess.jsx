import Button from "../../../components/button/Button";
import "./confirmSuccess.scss";
import icon from "../../../assets/dressIcon.svg";
import { useNavigate } from "react-router";
import { removeAllArticles } from "../../../features/CartArticle";
import { useDispatch } from "react-redux";

const ConfirmSucess = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  return (
    <div className="overlay">
      <div className="modalFrame">
        <h1>Your Order Have Been Sent Successfully</h1>
        <h3>Please Wait For A Confirmation In Your Phone Number Later</h3>
        <Button
          text="Go To Articles"
          width="70%"
          margin="2rem auto"
          image={icon}
          onClick={() => {
            dispatch(removeAllArticles());
            localStorage.removeItem("selectedArticles");
            navigate("/articles");
          }}
        />
      </div>
    </div>
  );
};

export default ConfirmSucess;
