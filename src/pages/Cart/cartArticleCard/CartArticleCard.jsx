/* eslint-disable react/prop-types */
import "./cartArticleCard.scss";
import { FaTimes } from "react-icons/fa";

const CartArticleCard = (props) => {
  return (
    <div className="cartArticleCard">
      <div className="left">
        <img src={props.article.imageUrl} alt="" />
      </div>
      <div className="right">
        <span>
          <span>Size : </span>
          {props.article.size}{" "}
        </span>
        <span>
          <span>Quantity : </span>
          {props.article.quantity}{" "}
        </span>
        <span>
          <span>Name : </span>
          {props.article.name}{" "}
        </span>
        <span>
          <span>Price : </span>
          {props.article.quantity * props.article.price} DA
        </span>
      </div>
      <FaTimes
        className="removeIcon"
        onClick={() => {
          props.removeItem(
            props.article.id,
            props.article.size,
            props.article.quantity,
            props.article.price
          );
          props.setError("Article Removed");
          setTimeout(() => {
            props.setError(null);
          }, 3000);
        }}
      />
    </div>
  );
};

export default CartArticleCard;
