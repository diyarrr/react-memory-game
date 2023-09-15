/* eslint-disable react/prop-types */
export default function Card(props) {
    const handleClick = () => {
      props.onClick(props.id); // Pass the card's id
    };
  
    return (
      <div className="card" onClick={handleClick}>
        <img src={props.src} alt="" />
        <div>{props.name}</div>
      </div>
    );
  }
  