import { Link, NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <header className="bar">
      <span className="font-display text-xl font-black tracking-tight">
        anecdotes<span className="text-brand">.</span>
      </span>

      <nav>
        <ul className="flex flex-wrap items-center gap-1">
          <li>
            <NavLink to="/" end className="pill">Anecdotes</NavLink>
          </li>
          <li>
            <Link to="/create" className="menu">
              <svg viewBox="0 0 24 24" className="fill-current size-4" aria-hidden="true">
                <path d="M11 5h2v14h-2zM5 11h14v2H5z" />
              </svg>

              Create Anecdote
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};