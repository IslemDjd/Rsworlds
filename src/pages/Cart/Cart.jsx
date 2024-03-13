import "./cart.scss";
import CartArticleCard from "./cartArticleCard/CartArticleCard";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import getCartArticleById from "../../utils/getCartArticleById";
const Cart = () => {
  const [myArticle, setMyArticle] = useState([]);

  const cartArticle = useSelector((state) => state.cartArticle.value.bucket);
  const dispatch = useDispatch();

  const setCartCollection = () => {
    cartArticle.map((item) => {
      getCartArticleById(item.id, setMyArticle);
    });
  };

  useEffect(() => {
    // getCartArticleById("6cWxf1bcuFOGQRW21O0b", setMyArticle);
    setCartCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>This Is Cart Page</h1>
      <CartArticleCard />
    </div>
  );
};

export default Cart;
