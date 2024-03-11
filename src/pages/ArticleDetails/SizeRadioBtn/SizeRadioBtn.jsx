/* eslint-disable react/prop-types */
import "./sizeRadioBtn.scss";
// import React from "react";

const SizeRadioBtn = (props) => {
  const handleRadioChange = () => {
    props.setSelectedSize(props.sizeValue);
    props.setSelectedQt(1);
  };
  return (
    <div className="radio-tile-group">
      <div className="input-container">
        <input
          id={props.sizeValue}
          onChange={handleRadioChange}
          className="radio-button"
          type="radio"
          name="radio"
        //   ref={ref}
        />
        <div className="radio-tile">
          <label htmlFor={props.sizeValue} className="radio-tile-label">
            {props.sizeValue}
          </label>
        </div>
      </div>
    </div>
  );
};

// SizeRadioBtn.displayName = "SizeRadioBtn"; 

export default SizeRadioBtn;
