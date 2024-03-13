/* eslint-disable react/prop-types */
import "./cartArticleCard.scss";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { removeArticle } from "../../../features/CartArticle";
import { useDispatch } from "react-redux";

const CartArticleCard = (props) => {
  const cartArticle = useSelector((state) => state.cartArticle.value.bucket);
  const dispatch = useDispatch();


  const removeItem = (id, size, qt) => {
    dispatch(
      removeArticle({
        id: id,
        size: size,
        quantity: qt,
      })
    );
  }

  return (
    <div className="cartArticleCard">
      <div className="left">
        <img src={props.article.imageUrl} alt="" />
      </div>
      <div className="right">
        <span>Name : {props.article.name} </span>
        <span>size : {props.article.size} </span>
        <span>quantity : {props.article.quantity} </span>
        <span>Price : {props.article.quantity * props.article.price} </span>
      </div>
      <FaTimes
        className="removeIcon"
        onClick={() => {
          removeItem(props.article.id, props.article.size, props.article.quantity)
        }}
      />
    </div>
  );
};

export default CartArticleCard;
