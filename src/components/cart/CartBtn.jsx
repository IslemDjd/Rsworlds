import cart from "../../assets/cart.svg";
import "./cartBtn.scss";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { addClass } from "../../features/ShowSideBar";

const Cart = () => {
  const page = useSelector((state) => state.page.value);
  const showSideBar = useSelector((state) => state.showSideBar.value);
  const cartArticle = useSelector((state) => state.cartArticle.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleHamburger = () => {
    dispatch(
      addClass({
        hamburger: "hamburger",
        close: "activeClose",
      })
    );
  };
  const toggleClose = () => {
    dispatch(
      addClass({
        hamburger: "activeHamburger",
        close: "close",
      })
    );
  };

  return (
    <div className="cart">
      {page == "Overview" ||
      page == "Articles" ||
      page == "Commands" ||
      page == "Settings" ? (
        <div>
          <GiHamburgerMenu
            className={showSideBar.hamburger}
            onClick={toggleHamburger}
          />
          <IoClose className={showSideBar.close} onClick={toggleClose} />
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default Cart;
