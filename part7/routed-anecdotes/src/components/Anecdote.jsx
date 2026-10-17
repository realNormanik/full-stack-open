import { Link, useParams } from "react-router-dom";

export default function Anecdote({ anecdotes }) {
  const { id } = useParams();
  const anecdote = anecdotes.find(a => a.id === Number(id));

  if (!anecdote) {
    return (
      <div className="card-soft gap-4">
        <h2>Anecdote not found.</h2>

        <Link to="/" className="action self-start">Back to Anecdotes</Link>
      </div>
    );
  };

  return (
    <article className="bento sm:grid-cols-3">
      <div className="card-ink animate-pop min-h-72 gap-8 sm:col-span-2 sm:row-span-2">
        <h2 className="quote">{anecdote.content}</h2>

        <Link to="/" className="action self-start">Back to Anecdotes</Link>
      </div>

      <div className="card-soft">
        <span className="meta">Author</span>
        <p className="value">{anecdote.author}</p>
      </div>

      <a
        href={anecdote.info}
        target="_blank"
        rel="noopener noreferrer"
        className="card sm:col-span-3 hover:scale-100 active:scale-100"
      >
        <span className="meta">Url</span>
        <span className="mt-1 break-all font-bold text-brand-ink">{anecdote.info}</span>
      </a>
    </article>
  );
};