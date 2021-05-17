import React, { useEffect, useRef, useState } from "react";

import Card from '../Card';
import CardGroup from '../CardGroup';

import s from './style.module.scss';

const App = () => {
  const initialCards = [
    {
        disabled: false,
        failed: false,
        id: 1,
        paired: false,
        selected: false,
        value: 1
    },
    {
        disabled: false,
        failed: false,
        id: 2,
        paired: false,
        selected: false,
        value: 1
    },
    {
        disabled: false,
        failed: false,
        id: 3,
        paired: false,
        selected: false,
        value: 2
    },
    {
        disabled: false,
        failed: false,
        id: 4,
        paired: false,
        selected: false,
        value: 2
    }
  ];

  const [games, setGames] = useState([]);
  const gamesRef = useRef(games);
  gamesRef.current = games;
  const [currentGame, setCurrentGame] = useState(null);
  const currentGameRef = useRef(currentGame);
  currentGameRef.current = currentGame;
  const [cards, setCards] = useState(initialCards);
  const cardsRef = useRef(cards);
  cardsRef.current = cards;
  const [cardsToDisable, setCardsToDisable] = useState([]);
  const [cardsToDefault, setCardsToDefault] = useState([]);
  
  useEffect( () => {
    let disablingTimer;
    if (cardsToDisable.length > 0) {
      disablingTimer = setTimeout(() => {
        let updatedCards = [...cardsRef.current];
        for (let i = 0; i < updatedCards.length; i++) {
          for (let j = 0; j < cardsToDisable.length; j++) {
            if (updatedCards[i].id === cardsToDisable[j].id) {
              updatedCards[i].selected = false;
              updatedCards[i].disabled = true;
              break;
            }
          }
        }
        setCards(updatedCards);
        setCardsToDisable([])
      }, 5000);
    }

    return () => clearTimeout(disablingTimer);

  }, [cardsToDisable]);
  
  useEffect( () => {
    let defaultingTimer;
    if (cardsToDefault.length > 0) {
      defaultingTimer = setTimeout(() => {
        let updatedCards = [...cardsRef.current];
        for (let i = 0; i < updatedCards.length; i++) {
          for (let j = 0; j < cardsToDefault.length; j++) {
            if (updatedCards[i].id === cardsToDefault[j].id) {
              updatedCards[i].selected = false;
              updatedCards[i].failed = false;
              break;
            }
          }
        }
        setCards(updatedCards);
        setCardsToDefault([])
      }, 1500);
    }

    return () => clearTimeout(defaultingTimer);

  }, [cardsToDefault]);
  
  useEffect( () => {
    const hasActiveCards = cardsRef.current.some(card => !card.disabled);

    if (!hasActiveCards) {
      const updatedGames = [...gamesRef.current, currentGameRef.current];
      setGames(updatedGames);
      setCurrentGame(null);
    }

  }, [cards]);

  const updateCardSelected = selectedId => {
    let updatedCards = [...cards];
    for (let i = 0; i < updatedCards.length; i++) {
      if (updatedCards[i].id === selectedId) {
        updatedCards[i].selected = !cards[i].selected;
        break;
      }
    }
    setCards(updatedCards);
  }

  const updateCardFailed = failedId => {
    let updatedCards = [...cards];
    for (let i = 0; i < updatedCards.length; i++) {
      if (updatedCards[i].id === failedId) {
        updatedCards[i].failed = true;
        break;
      }
    }
    setCards(updatedCards);
  }

  const updateCardPaired = pairedId => {
    let updatedCards = [...cards];
    for (let i = 0; i < updatedCards.length; i++) {
      if (updatedCards[i].id === pairedId) {
        updatedCards[i].paired = true;
        break;
      }
    }
    setCards(updatedCards);
  }

  const updateCurrentGameScore = () => {
    let updatedCurrentGame = currentGame;
    ++updatedCurrentGame.score;
    setCurrentGame(updatedCurrentGame);
  }

  const handleCardClick = (clickedCard) => {
    if (!clickedCard.disabled) {
      updateCurrentGameScore();
      updateCardSelected(clickedCard.id);
  
      const selectedCards = cards.filter((card) => card.selected);
      if (selectedCards.length === 2) {
        if (selectedCards[0].value === selectedCards[1].value) {
          updateCardPaired(selectedCards[0].id);
          updateCardPaired(selectedCards[1].id);
          setCardsToDisable(selectedCards);
        } else {
          updateCardFailed(selectedCards[0].id);
          updateCardFailed(selectedCards[1].id);
          setCardsToDefault(selectedCards);
        }
      }
    }
  }

  const handleStartClick = () => {
    const newGame = {
      score: 0,
      start: new Date(),
      time: 0
    };
    setCurrentGame(newGame);
    setCards(initialCards);
  }

  return ( 
    <div className={s.this}>
      {games.length > 0 && (
        <div>
          <h3>All Games</h3>
          {games.map((game) => (
            <p key={game.start}>{game.score} - {game.time}</p>
          ))}
        </div>
      )}
      {currentGame && (
        <div>
          <h3>Current Game</h3>
          <p>Score: {currentGame.score}</p>
          <p>Time: {currentGame.time}</p>
          <CardGroup>
            {cards.map(card => (
              <Card key={card.id} card={card} onClick={() => {handleCardClick(card)}} />
            ))}
          </CardGroup>
        </div>
      )}
      {!currentGame && (
        <button onClick={handleStartClick}>Start a new game</button>
      )}
    </div>
  );
}

export default App;
