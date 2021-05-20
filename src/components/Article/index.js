import './styles.css';

function Article({ text }) {
  return (
    <article className="article">
        {text}
    </article>
  );
}

export default Article;