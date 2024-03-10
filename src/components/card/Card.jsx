/* eslint-disable react/prop-types */
import Button from "../button/Button";
import "./card.scss";
import icon from "../../assets/cart.svg";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <>
      <Link to={`/articles/${props.articleId}`}>
        <div className="card">
          <div className="image_container">
            <img className="image" src={props.img} alt="" />
          </div>
          <div className="action">
            <div className="title">
              <span>{props.name}</span>
            </div>
            <div className="price">
              <span>
                Size:{props.size} {props.price}DA
              </span>
            </div>
            <Button
              image={icon}
              width="100%"
              margin="0 0.5rem 0.5rem 0.5rem"
              text="Add to cart"
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
