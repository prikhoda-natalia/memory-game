import React, {useEffect, useState, useRef} from 'react';
import Modal from 'react-modal';
import uuid from 'react-uuid';

import Cards from './components/Cards';
import GameLayout from './components/GameLayout';

const customStyles = {
  content : {
    top                   : '0',
    left                  : '0',
    right                 : '0',
    bottom                : '0'
  }
};
Modal.setAppElement('#root')

const GameModal = ({ isOpen, setIsOpen, updateGames }) => {
    function closeModal(){
        setCurrentGame(null);
        setIsOpen(false);
    }

    const [currentGame, setCurrentGame] = useState(null);
    const currentGameRef = useRef(currentGame);
    currentGameRef.current = currentGame;
    const [cards, setCards] = useState([]);
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
        }, 1500);
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
    
    // when cards are changed
    // if current game is not finished and there are no active cards left - finish current game and update games state
    useEffect( () => {
        const hasActiveCards = cardsRef.current.some(card => !card.disabled);

        if (currentGameRef.current && !currentGameRef.current.isFinished && !hasActiveCards) {
            let updatedCurrentGame = currentGameRef.current;
            updatedCurrentGame.isFinished = true;
            updateGames(updatedCurrentGame);
            setCurrentGame(updatedCurrentGame);
        }

    }, [cards, updateGames]);

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

    const newCardSet = () => {
        let cardSet = [];
        for (let i = 0; i < 18; i++) {
            const randomDigit = Math.floor(Math.random() * 10);
            const newCard = {
                value: randomDigit,
                disabled: false,
                failed: false,
                paired: false,
                selected: false
            };
            cardSet.push({
                ...newCard,
                id: uuid()
            });
            cardSet.push({
                ...newCard,
                id: uuid()
            });
        }
        // shuffle cardSet
        let j, temp;
        for (let i = cardSet.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = cardSet[j];
            cardSet[j] = cardSet[i];
            cardSet[i] = temp;
        }
        return cardSet;
    }

    const afterOpenModal = () => {
        const newGame = {
            isFinished: false,
            score: 0,
            start: new Date(),
            time: 0
        };
        setCurrentGame(newGame);
        setCards(newCardSet);
    }
    return (
        <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Игра"
        >
            <GameLayout onCloseClick={closeModal} currentGame={currentGame}>
                {currentGame && currentGame.isFinished && (
                    <div>Игра закончена!</div>
                )}
                <Cards cards={cards} onCardClick={handleCardClick} />
            </GameLayout>
        </Modal>
    );
}

export default GameModal;
