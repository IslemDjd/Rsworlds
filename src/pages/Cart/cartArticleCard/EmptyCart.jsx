import Button from "../../../components/button/Button";
import "./emptyCart.scss";
import icon from "../../../assets/dressIcon.svg";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="isEmpty">
      <h2>Your Cart Is Empty</h2>
      <Link to={"/articles"}>
        <Button
          image={icon}
          width="200px"
          margin="0 auto"
          text="Select Articles"
        />
      </Link>
    </div>
  );
};

export default EmptyCart;
