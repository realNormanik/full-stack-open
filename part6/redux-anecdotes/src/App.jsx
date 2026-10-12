import Filter from "./components/Filter";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div className="min-h-screen">
      <Notification />

      <main className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 lg:grid-cols-12">
        <div className="card-brand min-h-80 lg:col-span-7">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-2 select-none font-display text-[22rem] font-black leading-none text-on-brand/10"
          >
            ”
          </span>

          <div className="relative">
            <h1 className="text-on-brand">Anecdotes</h1>
            <p className="mt-5 max-w-sm text-base font-semibold text-on-brand/75">
              Vote for the stories you like. The most popular ones rise to the top.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:col-span-5">
          <section className="p-6">
            <Filter />
          </section>

          <section className="p-6">
            <AnecdoteForm />
          </section>
        </div>

        <div className="lg:col-span-12">
          <AnecdoteList />
        </div>
      </main>

      {/* Footer */}
      <p className="py-3 mb-5 text-center text-sm text-muted">
        Built with Redux & Tailwind CSS
      </p>

      {/* GitHub */}
      <aside className="github">
        <div className="z-2 fixed w-50 h-50 right-0 bottom-0 overflow-hidden after:content-[''] after:block after:absolute after:left-0 after:right-0 after:bottom-0 after:z-0 after:border-t-[12.5rem] after:border-t-transparent after:border-l-[12.5rem] after:border-l-transparent after:border-b-[12.5rem] after:border-b-[#343535]">
          <div className="u1 z-1 w-full h-full top-0 right-0 absolute justify-end -rotate-45">
            <a
              target="_blank"
              rel="noreferrer"
              aria-label="github-repo"
              href="https://github.com/realNormanik/full-stack-open/tree/main/part6/redux-anecdotes"
              className="u1 focus:text-g-100 hover:text-[#a6a6a6] text-white text-base font-mono no-underline px-6 pt-[.1875rem] pb-6 m-0 -mb-5 transition-colors duration-[150ms] ease-[cubic-bezier(1,-.115,.975,.855)]"
            >
              <p className="text-current font-normal text-base mt-4 mb-4">
                View on GitHub
              </p>

              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" aria-hidden="true" width="35" height="35">
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2.3z" />
              </svg>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default App;