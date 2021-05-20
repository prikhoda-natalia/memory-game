import './styles.css';

function MainMenu({ items }) {
  return (
    <ul className="main-menu">
        {items.map((item) =>
            <li className="main-menu__item" key={item.id}>
                <button onClick={item.onClick} className="main-menu__item-button">{item.value}</button>
            </li>
        )}
    </ul>
  );
}

export default MainMenu;