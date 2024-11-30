/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
function Button(props) {
  return (
    props?.buttonType == "link" ? (
      <Link to="" className={props?.className}>
        {props?.children}
      </Link>
    ) : <button
      disabled={props?.disabled}
      onClick={props?.handler}
      className={props?.className}>
      {props?.children}
    </button>


  );
}

export default Button;
