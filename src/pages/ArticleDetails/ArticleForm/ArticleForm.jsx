/* eslint-disable react/prop-types */
// import SizeRadioBtn from "../SizeRadioBtn/SizeRadioBtn";
import { useState } from "react";
import Button from "../../../components/button/Button";
import icon from "../../../assets/cart.svg";
import "./articleForm.scss";

// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

const ArticleForm = (props) => {
  const [selectedQt, setSelectedQt] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [add, setAdd] = useState({});

  // console.log(props);

  // Quantity State Increment and Decrement
  const increment = () => {
    if (selectedSize !== "") {
      setSelectedQt((prev) =>
        Math.min(props.article.size[selectedSize], prev + 1)
      );
      if (selectedQt == props.article.size[selectedSize]) {
        alert("There Is No More");
      }
    }
    setAdd({
      id: props.article.id,
      size: selectedSize,
      quantity: selectedQt,
    });
  };

  const decrement = () => {
    setSelectedQt((prev) => Math.max(1, prev - 1));
    setAdd({
      id: props.article.id,
      size: selectedSize,
      quantity: selectedQt,
    });
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
            onClick={() => {
              setSelectedSize(size)
              setAdd({
                id: props.article.id,
                size: selectedSize,
                quantity: selectedQt,
              });
            }}
          />
          <div className="radio-tile">
            <label htmlFor={size} className="radio-tile-label">
              {size}
            </label>
          </div>
        </div>
      </div>
      // <SizeRadioBtn
      //   setSelectedSize={setSelectedSize}
      //   setSelectedQt={setSelectedQt}
      //   key={size}
      //   sizeValue={size}
      // />
    ));

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const sendIt = () => {
    console.log(add);
  };

  return (
    <form action="" onSubmit={handleSubmit} className="articleForm">
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
          onChange={(e) => {
            console.log(e.target.value);
          }}
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
      />
      <button onClick={sendIt}>Submit</button>
    </form>
  );
};

export default ArticleForm;

// Form Validation
//   const schema = yup.object().shape({
//     // size: yup.string().required("Please Select A Size"),
//     quantity: yup.string().required(),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });
