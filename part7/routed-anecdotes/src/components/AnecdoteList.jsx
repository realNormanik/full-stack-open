import { Link } from "react-router-dom";

export default function AnecdoteList({ anecdotes, successMessage }) {
  return (
    <div className="page">
      {successMessage && <div role="status" className="toast">{successMessage}</div>}

      <h1>All Anecdotes</h1>

      <ul className="bento sm:grid-cols-2">
        {anecdotes.map(anecdote => (
          <li key={anecdote.id} className="flex">
            <Link to={`/anecdotes/${anecdote.id}`} className="card min-h-48 flex-1">
              <h2>{anecdote.content}</h2>
              <div className="flex items-center justify-between gap-3">
                <span className="meta">{anecdote.author}</span>
              </div>
            </Link>
          </li>
        ))}

        <li className="flex">
          <div className="card-brand flex-1">
            <h2>Got one of your own?</h2>

            <Link to="/create" className="create self-start">Create Anecdote</Link>
          </div>
        </li>
      </ul>
    </div>
  );
};