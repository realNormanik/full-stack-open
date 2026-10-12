import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well."
  ];

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const voteForAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const getAnecdoteWithMostVotes = () => {
    const maxVotes = Math.max(...votes);
    const index = votes.indexOf(maxVotes);

    return anecdotes[index];
  };

  return (
    <main>
      <div className="mx-auto flex min-h-[80vh] max-w-3xl flex-col justify-center">

        {/* Header */}
        <header>
          <div className="mb-4 inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary shadow-sm">
            ✨ Daily inspiration
          </div>

          <h1>
            Anecdote of the Day
          </h1>

          <p className="mt-4 text-text-secondary">
            Discover a new programming anecdote and vote for your favorite.
          </p>
        </header>

        {/* Main Card */}
        <section>

          {/* Anecdote */}
          <div className="p-8 sm:p-12">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                Current anecdote
              </span>

              <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
                #{selected + 1}
              </span>
            </div>

            <blockquote>
              “{anecdotes[selected]}”
            </blockquote>

            {/* Votes */}
            <div className="mt-8 flex items-center gap-3 text-sm text-text-secondary">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-like-soft">
                💖
              </div>

              <span>
                This anecdote has{" "}
                <span className="font-semibold text-text">
                  {votes[selected]}
                </span>{" "}
                {votes[selected] === 1 ? "vote" : "votes"}.
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={getRandomAnecdote}
                className="border border-border bg-surface-secondary text-text shadow-sm hover:bg-border"
              >
                🔃 Next Anecdote
              </button>

              <button
                onClick={voteForAnecdote}
                className="bg-accent hover:bg-accent-hover"
              >
                💖 Vote
              </button>
            </div>
          </div>

          {/* Most Votes */}
          <div className="border-t border-border bg-surface-secondary p-8 sm:p-12">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-highlight-soft text-lg">
                🏆
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-highlight">
                  Community favorite
                </p>

                <h2>
                  Anecdote with Most Votes
                </h2>
              </div>
            </div>

            <blockquote>
              “{getAnecdoteWithMostVotes()}”
            </blockquote>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <p className="mt-8 text-center text-sm text-text-muted">
            Built with React & Tailwind CSS
          </p>

          {/* GitHub */}
          <aside className="github">
            <div className="z-2 fixed w-50 h-50 right-0 bottom-0 overflow-hidden after:content-[''] after:block after:absolute after:left-0 after:right-0 after:bottom-0 after:z-0 after:border-t-[12.5rem] after:border-t-transparent after:border-l-[12.5rem] after:border-l-transparent after:border-b-[12.5rem] after:border-b-[#343535]">
              <div className="u1 z-1 w-full h-full top-0 right-0 absolute justify-end -rotate-45">
                <a
                  target="_blank"
                  rel="noreferrer"
                  aria-label="github-repo"
                  href="https://github.com/realNormanik/full-stack-open/tree/main/part1/anecdotes"
                  className="u1 focus:text-g-100 hover:text-[#a6a6a6] text-white text-base font-mono no-underline px-6 pt-[.1875rem] pb-6 m-0 -mb-5 transition-colors duration-[150ms] ease-[cubic-bezier(1,-.115,.975,.855)]"
                >
                  <p className="text-current font-normal text-base mt-4 mb-4">
                    View on GitHub
                  </p>

                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    aria-hidden="true"
                    width="35"
                    height="35"
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                </a>
              </div>
            </div>
          </aside>
        </footer>
      </div>
    </main>
  );
};

export default App;