import { useEffect, useState } from "react";
import axios from "axios";

import { DiaryEntry, NewDiaryEntry } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";

const visibilities = ["great", "good", "ok", "poor"] as const;
const weathers = ["sunny", "rainy", "cloudy", "stormy", "windy"] as const;

const weatherIcons: Record<string, string> = {
  sunny: "☀️",
  rainy: "🌧️",
  cloudy: "☁️",
  stormy: "⛈️",
  windy: "💨"
};

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then(data => setDiaries(data));
  }, []);

  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: "",
    visibility: "great",
    weather: "sunny",
    comment: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const addEntry = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const created = await createDiary(newEntry);
      setDiaries(diaries.concat(created));
      setError(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || "Unknown error");
      } else {
        setError("Unknown error");
      };
    };
  };

  return (
    <main>
      <header>
        <div className="part-head">
          <p className="meta">Weather and visibility of every flight</p>
          <h1>Flight Diaries</h1>
        </div>
        <div className="counter">
          {diaries.length}
          <span className="meta">entries</span>
        </div>
      </header>

      <div className="layout">
        <section className="panel">
          <h2>Add new entry</h2>

          {error && <p className="alert">{error}</p>}
          <form onSubmit={addEntry} className="contents">
            <label className="field">
              <span className="label">Date</span>
              <input
                className="input"
                type="date"
                name="date"
                value={newEntry.date}
                onChange={handleChange}
              />
            </label>

            <fieldset>
              <legend className="label">Visibility</legend>
              <div className="choices">
                {visibilities.map(v => (
                  <label key={v} className="choice">
                    <input
                      type="radio"
                      name="visibility"
                      value={v}
                      checked={newEntry.visibility === v}
                      onChange={handleChange}
                    />
                    <span>{v}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="label">Weather</legend>
              <div className="choices">
                {weathers.map(w => (
                  <label key={w} className="choice">
                    <input
                      type="radio"
                      name="weather"
                      value={w}
                      checked={newEntry.weather === w}
                      onChange={handleChange}
                    />
                    <span>{weatherIcons[w]} {w}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="field">
              <span className="label">Comment</span>
              <input
                className="input"
                name="comment"
                placeholder="How was the flight?"
                value={newEntry.comment}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20" fill="currentColor">
                <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
              </svg>

              Add entry</button>
          </form>
        </section>

        <section className="log">
          {diaries.length === 0 && (
            <div className="empty">
              <h3>No flights logged yet</h3>
              <p className="meta">Fill in the form to add your first entry.</p>
            </div>
          )}

          {diaries.map(d => (
            <article key={d.id} className="row">
              <div className="part-head">
                <h3>{d.date}</h3>
                <div className="tags">
                  <span className="chip">{weatherIcons[d.weather]} {d.weather}</span>
                  <span className="tone" data-tone={d.visibility}>
                    Visibility: {d.visibility}
                  </span>
                </div>
              </div>
              <div className="part-foot">
                <span className="gauge" data-level={d.visibility}>
                  <span /><span /><span /><span />
                </span>
              </div>
            </article>
          ))}
        </section>
      </div>

      <footer>
        <p className="py-3 mb-0 text-center text-sm text-foreground">
          Built with React + TS & Tailwind CSS
        </p>

        {/* GitHub */}
        <aside className="github">
          <div className="z-2 fixed w-50 h-50 right-0 bottom-0 overflow-hidden after:content-[''] after:block after:absolute after:left-0 after:right-0 after:bottom-0 after:z-0 after:border-t-[12.5rem] after:border-t-transparent after:border-l-[12.5rem] after:border-l-transparent after:border-b-[12.5rem] after:border-b-[#343535]">
            <div className="u1 z-1 w-full h-full top-0 right-0 absolute justify-end -rotate-45">
              <a
                target="_blank"
                rel="noreferrer"
                aria-label="github-repo"
                href="https://github.com/realNormanik/full-stack-open/tree/main/part9/flight-diary-frontend"
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