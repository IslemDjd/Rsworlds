import Button from "../../../components/button/Button";
import "./confirmSuccess.scss";
import icon from "../../../assets/dressIcon.svg";
import { useNavigate } from "react-router";

const ConfirmSucess = () => {

  const navigate = useNavigate();
  return (
    <div className="modalFrame">
      <h1>Your Order Have Been Sent Successfully</h1>
      <h3>Please Wait For A Confirmation In Your Phone Number Later</h3>
      <Button
        text="Go To Articles"
        width="70%"
        margin="2rem auto"
        image={icon}
        onClick={() => {
          navigate("/articles");
        }}
      />
    </div>
  );
};

export default ConfirmSucess;
