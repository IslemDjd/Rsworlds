import "./cart.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartArticleCard from "./cartArticleCard/CartArticleCard";
import ArticleLoader from "../../loaders/ArticleLoader";
import EmptyCart from "./cartArticleCard/EmptyCart";
import PopUpWarning from "../../components/popUp/PopUpWarning";
import getCartArticleById from "../../utils/getCartArticleById";
import { removeArticle } from "../../features/CartArticle";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";

const Cart = () => {
  const [myArticles, setMyArticles] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartArticle = useSelector((state) => state.cartArticle.value.bucket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeItem = (id, size, quantity, price) => {
    dispatch(removeArticle({ id, size, quantity }));
    setMyArticles((prevArticles) =>
      prevArticles.filter(
        (article) =>
          !(
            article.id === id &&
            article.size === size &&
            article.quantity === quantity
          )
      )
    );
    setTotalPrice((prevTotal) => prevTotal - price * quantity);
  };

  useEffect(() => {
    getCartArticleById(cartArticle, setMyArticles, setTotalPrice);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartArticle]);

  if (loading) {
    return <ArticleLoader />;
  }

  if (myArticles.length === 0) {
    return (
      <div>
        <EmptyCart />
      </div>
    );
  }

  return (
    <div>
      <h1 className="cartHeader">Your Articles</h1>
      {myArticles.map((article, index) => (
        <CartArticleCard
          key={index}
          article={article}
          removeItem={removeItem}
          setError={setError}
        />
      ))}
      <div className="bottom">
        <h1 className="totalArticlesPrice">Total Price : {totalPrice} DA</h1>
        <button
          className="ConfirmBuy"
          onClick={() => {
            localStorage.setItem(
              "selectedArticles",
              JSON.stringify(myArticles)
            );
            navigate("/checkout");
          }}
        >
          <FaCheck />
          Confirmer
        </button>
      </div>
      <div className="reminder">
        <p>Delivery Price Is Not Included</p>
        <p>Prix De Livraison N&apos;est Pas Inclus</p>
      </div>

      {error && <PopUpWarning errorText={error} setError={setError} />}

      <div style={{ height: "200px" }}></div>
    </div>
  );
};

export default Cart;
