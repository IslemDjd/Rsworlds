import "./cart.scss";
import CartArticleCard from "./cartArticleCard/CartArticleCard";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import getCartArticleById from "../../utils/getCartArticleById";

const Cart = () => {
  const [myArticles, setMyArticles] = useState([]);
  const cartArticle = useSelector((state) => state.cartArticle.value.bucket);

  console.log(myArticles);
  useEffect(() => {
    getCartArticleById(cartArticle, setMyArticles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>This Is Cart Page</h1>
      {myArticles.map((article, index) => (
        <CartArticleCard key={index} article={article} />
      ))}
    </div>
  );
};

export default Cart;
