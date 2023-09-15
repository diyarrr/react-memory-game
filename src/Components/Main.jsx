import { useEffect, useState } from "react";
import characters from "../assets/Characters";
import Cards from "./Cards";

export default function Main() {
  // my states
  const [shuffledCharacters, setShuffledCharacters] = useState(characters);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedPersons, setClickedPersons] = useState([]);
  const [win, setWin] = useState(false);

  // handle if one of the card is clicked
  function handleClick(id) {
    if (isClicked(clickedPersons, id)) {
      setClickedPersons([...clickedPersons, id]);
      setCurrentScore((prevScore) => prevScore + 1);
    } else {
      setCurrentScore(0);
      setClickedPersons([]);
    }
  }

  // every change on currentScore call this function with useEffect
  function shuffleCards() {
    let shuffled = [...characters];

    shuffled = shuffleArray(shuffled);

    setShuffledCharacters(shuffled);
  }

  // after game finished, reset everything in order to start a new game
  function handlePlayAgain() {
    setCurrentScore(0);
    setBestScore(0);
    setWin(false);
    setClickedPersons([]);
  }

  useEffect(() => {
    shuffleCards(); // Call shuffleCards directly in the effect
    if (currentScore > bestScore) {
      setBestScore(currentScore);
      // if currentScore is equal to length of the character array that means game is over
      if (currentScore >= characters.length) {
        setWin(true);
      }
    }
  }, [currentScore]);

  // display the content with the help of win flag
  return !win ? (
    <Cards
      shuffledCharacters={shuffledCharacters}
      onClick={handleClick}
      currentScore={currentScore}
      bestScore={bestScore}
    />
  ) : (
    <div id="win">
      Woke up this morning, got yourself a win
      <div>
        <button id="play-again-button" onClick={handlePlayAgain}>
          Play again
        </button>
      </div>
    </div>
  );
}

// shuffle cards with Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// check if the specific card clicked so far
function isClicked(list, itemId) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === itemId) return false;
  }
  return true;
}
