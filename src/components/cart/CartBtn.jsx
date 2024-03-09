import cart from "../../assets/cart.svg";
import "./cart.scss";
import { useNavigate } from "react-router";

const Cart = () => {
  const navigate = useNavigate();
  return (
    <div className="cart">
      <img
        className="cartIcon"
        onClick={() => {
          navigate("/cart");
        }}
        src={cart}
        alt=""
      />
      <div className="cartItems">0</div>
    </div>
  );
};

export default Cart;
