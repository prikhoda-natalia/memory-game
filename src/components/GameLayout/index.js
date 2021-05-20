import './styles.css';

function GameLayout({ children, currentGame, onCloseClick }) {
  return (
    <div className="game-layout">
        <div className="game-layout__header">
            {currentGame && (
                <div className="game-layout__scoreboard">
                    <div className="game-layout__score">
                        <span className="game-layout__score-label">Время</span>
                        <span className="game-layout__score-value">{currentGame.time}</span>
                    </div>
                    <div className="game-layout__score">
                        <span className="game-layout__score-label">№ шагов</span>
                        <span className="game-layout__score-value">{currentGame.score}</span>
                    </div>
                </div>
            )}
            <button className="game-layout__close-button" onClick={onCloseClick}>
                <span className="game-layout__close-button-icon">🞩</span>
                <span className="game-layout__close-button-text">Закрыть</span>
            </button>
        </div>
        <div className="game-layout__content">
            {children}
        </div>
    </div>
  );
}

export default GameLayout;