import './styles.css';

function InfoLayout({ children, onCloseClick, title }) {
  return (
    <div className="info-layout">
        <div className="info-layout__header">
            <div className="info-layout__title">{title}</div>
            <button className="info-layout__close-button" onClick={onCloseClick}>
                <span className="info-layout__close-button-icon">๐ฉ</span>
                <span className="info-layout__close-button-text">ะะฐะบัััั</span>
            </button>
        </div>
        <div className="info-layout__content">
            {children}
        </div>
    </div>
  );
}

export default InfoLayout;