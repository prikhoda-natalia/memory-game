import './styles.css';

function OnlyMenuLayout({ children, title }) {
  return (
    <div className="layout">
        <div className="layout__main">
            <h1 className="layout__title">{title}</h1>
            <div className="layout__content">
                {children}
            </div>
        </div>
        <div className="layout__footer">Made with ♡ by <a href="https://prikhoda-natalia.github.io/" target="_blank" rel="noreferrer" className="layout__link">Natalia Prikhoda</a></div>
    </div>
  );
}

export default OnlyMenuLayout;