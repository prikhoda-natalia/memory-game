import s from './style.module.scss';

const Card = ({ card, onClick }) => (
  <div className={s.this}>
    <pre>
      disabled: {`${card.disabled}`}<br />
      failed: {`${card.failed}`}<br />
      paired: {`${card.paired}`}<br />
      selected: {`${card.selected}`}<br />
      value: {card.value}<br />
    </pre>
    <button onClick={onClick}>Select</button>
  </div>
);

export default Card;
