/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Button from "../../../components/button/Button";
import icon from "../../../assets/cart.svg";
import "./articleForm.scss";
import PopUpWarning from "../../../components/popUp/PopUpWarning";
import PopUpSuccess from "../../../components/popUp/PopUpSuccess";

import { useSelector, useDispatch } from "react-redux";
import { addArticle } from "../../../features/CartArticle";

const ArticleForm = (props) => {
  const cartArticle = useSelector((state) => state.cartArticle.value);
  const dispatch = useDispatch();

  const [selectedQt, setSelectedQt] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [addToCart, setAddToCart] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  console.log(cartArticle.bucket);

  useEffect(() => {
    handleAddToCart();
    // handleAddArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQt, selectedSize]);

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
  }, [error, success]);

  // Quantity State Increment and Decrement
  const increment = () => {
    if (selectedSize !== "") {
      if (selectedQt == props.article.size[selectedSize]) {
        setError("You've Selected All Available Articles");
      } else {
        setSelectedQt((prev) =>
          Math.min(props.article.size[selectedSize], prev + 1)
        );
      }
    } else {
      setError("Please select a size");
    }
  };

  const decrement = () => {
    if (selectedSize !== "") {
      if (selectedQt == 1) {
        setError("You Can't Select 0 Items");
      } else {
        setSelectedQt((prev) => Math.max(1, prev - 1));
      }
    } else {
      setError("Please select a size");
    }
  };

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

  const handleAddToCart = () => {
    setAddToCart({
      id: props.article.id,
      size: selectedSize,
      quantity: selectedQt,
    });
  };

  const handleAddArticle = () => {
    if (addToCart !== undefined) {
      dispatch(addArticle(addToCart));
    }
  };

  const sendIt = () => {
    if (selectedSize !== "") {
      handleAddToCart();
      console.log("Add to cart clicked");
      setSuccess("Article Added To Cart");

      handleAddArticle();
      localStorage.setItem("cartArticle", JSON.stringify(cartArticle.bucket));
      console.log(addToCart);
    } else {
      setError("Please Select a Size First ");
    }
  };

  return (
    <div className="articleForm">
      <span className="articleSize">
        Available Sizes :<div className="storeSizes">{sizeElements}</div>
      </span>

      <div className="quantity">
        <span className="quantityText">Select Quantity </span>
        <button className="minus" onClick={decrement}>
          -
        </button>
        <input
          type="number"
          className="quantityValue"
          readOnly
          value={selectedQt}
        />
        <button className="plus" onClick={increment}>
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
        onClick={sendIt}
      />

      {error && <PopUpWarning errorText={error} setError={setError} />}
      {success && (
        <PopUpSuccess successText={success} setSuccess={setSuccess} />
      )}

      <div>
        {/* <h1>id : {cartArticle?.bucket[0].id}</h1> */}
        {/* <h1>size : {cartArticle?.bucket[0].size}</h1> */}
        {/* <h1>bucket : {cartArticle?.bucket[0]}</h1> */}
      </div>
    </div>
  );
};

export default ArticleForm;

//  const handleAddArticle = () => {
//    const existingItemIndex = cartArticle.bucket.findIndex(
//      (item) => item.id === addToCart.id && item.size === addToCart.size
//    );

//    if (existingItemIndex === -1) {
//      dispatch(addArticle(addToCart));
//    }
//  };
