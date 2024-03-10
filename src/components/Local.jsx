import { useState } from "react";

const Local = () => {
  // Initialize state to hold the value
  const [value, setValue] = useState(
    localStorage.getItem("myValueInLocalStorage") || ""
  );

  // Function to handle input change
  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    // Store the new value in local storage
    localStorage.setItem("myValueInLocalStorage", newValue);
  };

  return (
    <div>
      <h1>Local Storage Example</h1>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>Value in local storage: {value}</p>
    </div>
  );
};

export default Local;
