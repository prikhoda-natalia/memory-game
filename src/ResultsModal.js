import React from 'react';
import Modal from 'react-modal';

import InfoLayout from './components/InfoLayout';

const customStyles = {
  content : {
    top                   : '0',
    left                  : '0',
    right                 : '0',
    bottom                : '0'
  }
};
Modal.setAppElement('#root')

function ResultsModal({ games, isOpen, setIsOpen }) {
  function closeModal(){
    setIsOpen(false);
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Результаты игр"
    >
        <InfoLayout onCloseClick={closeModal} title="Результаты игр">
          {games.length > 0 && (
            <div>
              {games.map((game) => (
                <p key={game.start}>{game.score} - {game.time}</p>
              ))}
            </div>
          )}
          {games.length === 0 && (
            <div>
              Вы не сыграли ни одной игры.
            </div>
          )}
        </InfoLayout>
    </Modal>
  );
}

export default ResultsModal;
