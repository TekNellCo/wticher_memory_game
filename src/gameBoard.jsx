import { useState, useEffect } from 'react';
import cardCreatorShuffle from './cards';
import { cardFlipSFX } from './sounds';
import cardBackgroundImg from './assets/card_background.webp';

function GameBoard({ addStrike, win, state, isMuted }) {
  // let cards;
  // if (round === 'firstRound') {
  //   cards = 6;
  // } else if (round === 'secondRound') {
  //   cards = 10;
  // } else if (round === 'thirdRound') {
  //   cards = 12;
  // }

  let cards;
  if (state === 'firstRound') {
    cards = 6;
  } else if (state === 'secondRound') {
    cards = 8;
  } else if (state === 'thirdRound') {
    cards = 10;
  }

  const cardBackground = cardBackgroundImg; ///default card background
  const [shuffledCards, setShuffledCards] = useState([]); ///stored shuffled cards
  const [isHidden, setIsHidden] = useState([]); ///tracks if cards are hidden or not
  const [matchedCards, setMatchedCards] = useState([]);
  const [isFlipped, setFlippedCards] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  /////pulls shuffled cards from cards.jsx
  useEffect(() => {
    setMatchedCards([]);
    setFlippedCards([]);
    const pulledCards = cardCreatorShuffle(cards);
    setIsHidden(new Array(pulledCards.length).fill(true)); /////puts all the cards in a hidden array

    setShuffledCards(pulledCards);
  }, [state, cards]);

  useEffect(() => {
    if (isFlipped.length === 2 && !isProcessing) {
      const [firstCard, secondCard] = isFlipped; ///if 2 cards in flipped array, name them
      setIsProcessing(true);
      ////compares both cards
      if (firstCard.name !== secondCard.name) {
        addStrike((prevStrike) => prevStrike + 1); ///adds a strike if they don't match + pushes it to App.js
        setTimeout(() => {
          ////adds a slight delay before turning cards back over
          setIsHidden((hiddenValue) =>
            hiddenValue.map((hidden, i) => (shuffledCards[i] === firstCard || shuffledCards[i] === secondCard ? true : hidden))
          );
          setIsProcessing(false);
        }, 800);
      } else {
        ///cards match so add them to the array
        setMatchedCards((currentMatched) => [...currentMatched, firstCard, secondCard]);
        setIsProcessing(false);
      }
      setFlippedCards([]); // Reset flipped cards after checking
    }
  }, [isFlipped, addStrike, shuffledCards]); // Triggered when isFlipped changes

  function handleCardClick(card, index) {
    cardFlipSFX(isMuted);
    if (isProcessing || matchedCards.includes(card)) return; /////if its already in the matched cards array do nothing
    // Flip the card
    setIsHidden((prev) => prev.map((hidden, i) => (i === index ? !hidden : hidden)));
    setFlippedCards((prevFlipped) => {
      const updatedFlipped = [...prevFlipped, card];
      if (updatedFlipped.length === 2) {
        return updatedFlipped; // Return the two flipped cards
      }
      return updatedFlipped; // Otherwise, keep adding the flipped cards
    });
  }
  ///makes sure the array isn't empty and if they match in length push winning condition
  const allCardsMatch = shuffledCards.length > 0 && shuffledCards.length === matchedCards.length;
  useEffect(() => {
    if (allCardsMatch === true) {
      win(true);
      setTimeout(() => win(false), 20);
    }
  }, [allCardsMatch]);

  return (
    <>
      {shuffledCards.map((card, index) => (
        <div key={index} className={`cardContainer ${state}`} onClick={() => handleCardClick(card, index)}>
          <div className={`card ${isHidden[index] ? '' : 'flipped'}`}>
            <div className="front">
              <img src={cardBackground} alt="" />
            </div>
            <div className="back">
              <img src={card.src} alt="" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default GameBoard;
