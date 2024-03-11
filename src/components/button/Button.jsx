/* eslint-disable react/prop-types */
import "./button.scss";
const Button = (props) => {
  return (
    <button onClick={props.onClick} style={{width:`${props.width}`,height:`${props.height}`, margin:`${props.margin}`}}>
      <img className="icon" src={props.image} alt="" />
      <span>{props.text}</span>
    </button>
  );
};

export default Button;
