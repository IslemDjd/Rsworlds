/* eslint-disable react/prop-types */
import SizeRadioBtn from "../SizeRadioBtn/SizeRadioBtn";
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
  const [add, setAdd] = useState([]);

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

  // Quantity State Increment and Decrement
  const increment = () => {
    if (selectedSize !== "") {
      setSelectedQt((prev) =>
        Math.min(props.article.size[selectedSize], prev + 1)
      );
      //   console.log(selectedQt);
      //   console.log(selectedSize);
      if (selectedQt == props.article.size[selectedSize]) {
        alert("There Is No More");
        // console.log(props.article.size[selectedSize]);
      }
    }
  };

  const decrement = () => {
    setSelectedQt((prev) => Math.max(1, prev - 1));
    console.log(selectedQt);
    console.log(selectedSize);
  };

  // Mapping and Filtering the Sizes Object
  const sizesOrder = ["S", "M", "L", "XL", "XXL"];
  const sizeElements = sizesOrder
    .filter((size) => props.article.size[size] > 0)
    .map((size) => (
      <SizeRadioBtn
        setSelectedSize={setSelectedSize}
        setSelectedQt={setSelectedQt}
        key={size}
        sizeValue={size}
        // {...register("size")}
      />
    ));

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const sendIt = () => {
    setAdd( selectedQt, selectedSize);
    console.log(add);
  };

  return (
    <form action="" onSubmit={handleSubmit} className="articleForm">
      <span className="articleSize">
        Available Sizes :<div className="storeSizes">{sizeElements}</div>
      </span>

      {/* <p>{errors.size?.message}</p> */}

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
          //   {...register("quantity")}
        />
        {/* <span className="quantityValue">1</span> */}
        <button className="plus" onClick={increment}>
          +
        </button>
      </div>

      {/* <p>{errors.quantity?.message}</p> */}

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
