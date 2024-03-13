import cart from "../../assets/cart.svg";
import "./cart.scss";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartArticle = useSelector((state) => state.cartArticle.value);
  const navigate = useNavigate();
  return (
    <div className="cart">
      <img
        className="cartIcon"
        onClick={() => {
          navigate("cart");
        }}
        src={cart}
        alt=""
      />
      <div className="cartItems">{cartArticle.bucket.length}</div>
    </div>
  );
};

export default Cart;
