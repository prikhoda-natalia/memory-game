import s from './style.module.scss';

const CardGroup = ({ children } ) => (
  <div className={s.this}>
    {children.map(child => <div className={s.item}>{child}</div>)}
  </div>
);

export default CardGroup;
