
function Card(props) {

  return (
    <div className={`bl-card ${props.size}`}>
      {props?.heading && <h3>{props?.heading} <span>{props?.otherInfo}</span></h3>}
      {props?.children}
    </div>
  );
}

export default Card;
