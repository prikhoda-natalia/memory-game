import React from 'react';
import Modal from 'react-modal';

import Article from './components/Article';
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

function RulesModal({ isOpen, setIsOpen }) {
  function closeModal(){
    setIsOpen(false);
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Правила игры"
    >
        <InfoLayout onCloseClick={closeModal} title="Правила">
            <Article text="Есть набор пар карт (перемешанных), которые лежат рубашкой вверх полем 6х6. Игрок открывает одну карту, которая остается открытой. Дальше он открывает вторую карту. Если первая и вторая карты одинаковые - они пропадают (уходят из игры и вместо них пустоты на игровом поле).  Если первая и вторая карты разные, то они обе переворачиваются рубашкой вверх и остаются на своих местах (задержка 1.5 сек).  Цель игры убрать все пары карт за минимальное количество времени и ходов." />
        </InfoLayout>
    </Modal>
  );
}

export default RulesModal;
