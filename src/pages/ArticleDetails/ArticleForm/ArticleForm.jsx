/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Button from "../../../components/button/Button";
import icon from "../../../assets/cart.svg";
import "./articleForm.scss";
import PopUpWarning from "../../../components/popUp/PopUpWarning";
import PopUpSuccess from "../../../components/popUp/PopUpSuccess";
import { useSelector, useDispatch } from "react-redux";
import {
  addArticle,
  removeArticle,
  removeAllArticles,
} from "../../../features/CartArticle";
import addToCart from "../../../utils/addToCart";
import { decrement, increment } from "./articleForm.helpers";

const ArticleForm = (props) => {
  const cartArticle = useSelector((state) => state.cartArticle.value);
  const dispatch = useDispatch();
  const [selectedQt, setSelectedQt] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }

    if (success) {
      const timeout = setTimeout(() => {
        setSuccess(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success]);

  // Mapping and Filtering the Sizes Object
  const sizesOrder = ["S", "M", "L", "XL", "XXL"];
  const sizeElements = sizesOrder
    .filter((size) => props.article.size[size] > 0)
    .map((size, index) => (
      <div className="radio-tile-group" key={index}>
        <div className="input-container">
          <input
            id={size}
            className="radio-button"
            type="radio"
            name="radio"
            onChange={() => {
              setSelectedQt(1);
            }}
            onClick={() => {
              setSelectedSize(size);
            }}
          />
          <div className="radio-tile">
            <label htmlFor={size} className="radio-tile-label">
              {size}
            </label>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="articleForm">
      <span className="articleSize">
        Available Sizes :<div className="storeSizes">{sizeElements}</div>
      </span>

      <div className="quantity">
        <span className="quantityText">Select Quantity </span>
        <button
          className="minus"
          onClick={() => {
            decrement(selectedQt, setSelectedQt, selectedSize, setError);
          }}
        >
          -
        </button>
        <input
          type="number"
          className="quantityValue"
          readOnly
          value={selectedQt}
        />
        <button
          className="plus"
          onClick={() => {
            increment(
              selectedQt,
              setSelectedQt,
              selectedSize,
              setError,
              props.article
            );
          }}
        >
          +
        </button>
      </div>

      <div className="totalPrice">
        <h3>Total Price : </h3>
        <span>{props.article.price * selectedQt}</span>
        <h3> DA</h3>
      </div>
      <Button
        image={icon}
        width="200px"
        height="2.5rem"
        margin="3rem auto"
        text="Add to cart"
        onClick={addToCart(
          cartArticle,
          selectedSize,
          selectedQt,
          props.article,
          addArticle,
          removeArticle,
          setSuccess,
          setError,
          dispatch
        )}
      />

      {error && <PopUpWarning errorText={error} setError={setError} />}
      {success && (
        <PopUpSuccess successText={success} setSuccess={setSuccess} />
      )}

      <button
        onClick={() => {
          dispatch(removeAllArticles());
          setSuccess("All Articles Removed From Your Cart")
        }}
      >
        Reset Cart
      </button>
    </div>
  );
};

export default ArticleForm;
