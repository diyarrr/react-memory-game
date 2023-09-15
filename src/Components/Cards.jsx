/* eslint-disable react/prop-types */
import Card from "./Card";

export default function Cards(props) {
  return (
    <>
      <div className="score">
        <div>Current Score : {props.currentScore}</div>
        <div>Best Score : {props.bestScore} </div>
      </div>
      <div className="cards">
        {props.shuffledCharacters?.map((character, index) => (
          <Card
            key={index}
            id={character.id}
            name={character.name}
            src={character.src}
            onClick={props.onClick}
          />
        ))}
      </div>
    </>
  );
}
