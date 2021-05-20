import './styles.css';

const Cards = ({ cards, onCardClick } ) => (
  <div className="cards">
    {cards.map(card => {
        let className="cards__item";
        if (card.disabled) {
            className += " cards__item--disabled";
        }
        if (card.failed) {
            className += " cards__item--failed";
        }
        if (card.paired) {
            className += " cards__item--paired";
        }
        if (card.selected) {
            className += " cards__item--selected";
        }
        if (card.disabled) {
            return (
                <span className={className} key={card.id}></span>
            );
        }
        return (
            <button className={className} key={card.id} onClick={() => onCardClick(card)}>{!card.disabled && card.value}</button>
        );
    })}
  </div>
);

export default Cards;
