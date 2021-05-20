import './styles.css';

function CTAButton({ onClick, value }) {
  return (
    <button className="cta-button" onClick={onClick}>{value}</button>
  );
}

export default CTAButton;