import React, {useState, useRef} from 'react';

import GameModal from './GameModal';
import ResultsModal from './ResultsModal';
import RulesModal from './RulesModal';
import CTAButton from './components/CTAButton';
import MainMenu from './components/MainMenu';
import OnlyMenuLayout from './components/OnlyMenuLayout';

import './App.css';

function App() {
  /* Все игры */
  const [games, setGames] = useState([]);
  const gamesRef = useRef(games);
  gamesRef.current = games;
  const updateGames = newGame => {
    const updatedGames = [...games, newGame];
    setGames(updatedGames);
  }

  const menuItems = [
    {
      id: "rules",
      onClick: openRulesModal,
      value: "Правила"
    },
    {
      id: "results",
      onClick: openResultsModal,
      value: "Таблица результатов"
    }
  ];

  /* Правила */
  const [rulesModalIsOpen, setRulesModalIsOpen] = useState(false);
  function openRulesModal() {
    setRulesModalIsOpen(true);
  }
  /* Правила */
  const [resultsModalIsOpen, setResultsModalIsOpen] = useState(false);
  function openResultsModal() {
    setResultsModalIsOpen(true);
  }
  /* Актуальная игра */
  const [gameModalIsOpen, setGameModalIsOpen] = useState(false);
  function openGameModal() {
    setGameModalIsOpen(true);
  }

  return (
    <OnlyMenuLayout title="нАйди пАру">
      <GameModal updateGames={updateGames} isOpen={gameModalIsOpen} setIsOpen={setGameModalIsOpen} />
      <RulesModal isOpen={rulesModalIsOpen} setIsOpen={setRulesModalIsOpen} />
      <ResultsModal games={games} isOpen={resultsModalIsOpen} setIsOpen={setResultsModalIsOpen} />
      <MainMenu items={menuItems} />
      <CTAButton onClick={openGameModal} value="Начать игру" />
    </OnlyMenuLayout>
  );
}

export default App;
