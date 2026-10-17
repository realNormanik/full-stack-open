import useField from "./hooks/useField";
import useResource from "./components/useResource";

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource(`${import.meta.env.VITE_API_URL}/api/notes`);
  const [persons, personService] = useResource(`${import.meta.env.VITE_API_URL}/api/persons`);

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.reset();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({
      name: name.value,
      number: number.value,
    });
    name.reset();
    number.reset();
  };

  const handleNoteDelete = (id) => {
    noteService.remove(id);
  };

  const handlePersonDelete = (id) => {
    personService.remove(id);
  };

  return (
    <main>
      <header className="stack">
        <h1>Notes &amp; people</h1>

        <p className="lead">
          Jot things down and keep your contacts close, all in one place.
        </p>
      </header>

      <div className="bento">
        <section className="card-brand col-span-1 md:col-span-3">
          <p className="text-sm font-medium opacity-80">Notes</p>
          <p className="value">{notes.length}</p>
        </section>

        <section className="card-ink col-span-1 md:col-span-3">
          <p className="text-sm font-medium opacity-70">People</p>
          <p className="value">{persons.length}</p>
        </section>

        <section className="card col-span-2 md:col-span-3">
          <h2>Notes</h2>

          <form onSubmit={handleNoteSubmit} className="stack">
            <input
              value={content.value}
              onChange={content.onChange}
              placeholder="Write a note…"
              aria-label="Note"
              className="input"
            />

            <button type="submit" className="create">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="15" height="15">
                <path d="M535.6 85.7C513.7 63.8 478.3 63.8 456.4 85.7L432 110.1L529.9 208L554.3 183.6C576.2 161.7 576.2 126.3 554.3 104.4L535.6 85.7zM236.4 305.7C230.3 311.8 225.6 319.3 222.9 327.6L193.3 416.4C190.4 425 192.7 434.5 199.1 441C205.5 447.5 215 449.7 223.7 446.8L312.5 417.2C320.7 414.5 328.2 409.8 334.4 403.7L496 241.9L398.1 144L236.4 305.7zM160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z" />
              </svg>

              Create note
            </button>
          </form>

          <div className="stack">
            {notes.length === 0 && <p className="empty">No notes yet.</p>}

            {notes.map((n) => (
              <article key={n.id} className="row">
                <p className="min-w-0 break-words font-medium">{n.content}</p>
                <button
                  type="button"
                  className="remove"
                  onClick={() => handleNoteDelete(n.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25">
                    <path d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z" />
                  </svg>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="card-soft col-span-2 md:col-span-3">
          <h2>People</h2>

          <form onSubmit={handlePersonSubmit} className="stack">
            <input
              value={name.value}
              onChange={name.onChange}
              placeholder="Name"
              aria-label="Name"
              className="input"
            />
            <input
              value={number.value}
              onChange={number.onChange}
              placeholder="Number"
              aria-label="Number"
              className="input"
            />

            <button type="submit" className="create">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="15" height="15">
                <path d="M285.7 368C384.2 368 464 447.8 464 546.3C464 562.7 450.7 576 434.3 576L77.7 576C61.3 576 48 562.7 48 546.3C48 447.8 127.8 368 226.3 368L285.7 368zM528 144C541.3 144 552 154.7 552 168L552 216L600 216C613.3 216 624 226.7 624 240C624 253.3 613.3 264 600 264L552 264L552 312C552 325.3 541.3 336 528 336C514.7 336 504 325.3 504 312L504 264L456 264C442.7 264 432 253.3 432 240C432 226.7 442.7 216 456 216L504 216L504 168C504 154.7 514.7 144 528 144zM256 312C189.7 312 136 258.3 136 192C136 125.7 189.7 72 256 72C322.3 72 376 125.7 376 192C376 258.3 322.3 312 256 312z" />
              </svg>

              Create person
            </button>
          </form>

          <div className="stack">
            {persons.length === 0 && <p className="empty">No people yet.</p>}

            {persons.map((p) => (
              <article key={p.id} className="row">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="avatar" aria-hidden="true">
                    {p.name?.charAt(0).toUpperCase()}
                  </span>
                  <div className="flex min-w-0 flex-col items-start gap-1">
                    <p className="truncate font-semibold">{p.name}</p>
                    <span className="chip">{p.number}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="remove"
                  onClick={() => handlePersonDelete(p.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25">
                    <path d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z" />
                  </svg>
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer>
        <p className="py-3 mb-0 text-center text-sm text-foreground">
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
                href="https://github.com/realNormanik/full-stack-open/tree/main/part7/ultimate-hooks"
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
      </footer>
    </main>
  );
};

export default App;