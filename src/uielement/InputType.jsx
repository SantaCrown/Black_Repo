import React, { useState } from "react";
import { SearchIco } from "../icons/icons";
function InputType(props) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyUp = (event) => {
    console.log('Key released:', event.key);
  };
  // Handle change in input value
  const handleChange = (event) => {
    setInputValue(event.target.value);
    props.onInputChange(event);
    console.log('Input value changed:', event.target.value);
  };
  return (
    <div className={` input-feild ${!props?.icon ? "" : "non-icon"}`}>
      <label>

        {props?.label && <p className="label">{props.label}</p>}
        {!props.icon && <span>{<SearchIco />}</span>}{" "}
        <input
        className="mt-3"
          value={inputValue}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          placeholder={props.placeholder}
          type={props.type}
          name={props.name}
        />
      </label>
    </div>
  );
}

export default InputType;
