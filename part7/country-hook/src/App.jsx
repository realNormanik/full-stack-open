import { useState } from "react";
import useCountry from "./components/useCountry";

const App = () => {
  const [countryName, setCountryName] = useState("");
  const { country, loading, error } = useCountry(countryName);

  const handleSearch = (event) => {
    event.preventDefault();
    setCountryName(event.target.country.value.trim());
  };

  const capitals = country?.capitals?.map((capital) => capital.name).join(", ") || "No capital data";

  const currencies = country?.currencies ?? [];
  const languages = country?.languages ?? [];

  return (
    <main className="page">
      <header className="hero">
        <h1>Where to next?</h1>

        <p className="lead">
          Look up any country and get the essentials in one place.
        </p>

        <form onSubmit={handleSearch} className="search">
          <input
            name="country"
            placeholder="Enter country name"
            aria-label="Country name"
            autoComplete="off"
            className="field"
          />

          <button type="submit" className="find">
            Search
          </button>
        </form>
      </header>

      {loading && (
        <div className="notice" role="status">
          <span className="spinner" />
          Loading country data…
        </div>
      )}

      {error && (
        <p className="error" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25">
            <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z" />
          </svg>

          {error}
        </p>
      )}

      {country && (
        <section className="bento" aria-live="polite">
          <article className="card-ink col-span-2 md:col-span-4">
            {country.flag?.url_svg && (
              <img src={country.flag.url_svg} alt="" className="backdrop" />
            )}

            {country.flag?.url_svg && (
              <img
                src={country.flag.url_svg}
                alt={`Flag of ${country.names.common}`}
                className="flag-img"
              />
            )}

            <div className="flex flex-col gap-3">
              <h2>{country.names.common}</h2>

              <p className="text-base font-medium text-black">
                {country.names.official}
              </p>

              {country.descriptions?.short && (
                <p className="max-w-xl text-base leading-relaxed text-black">
                  {country.descriptions.short}
                </p>
              )}
            </div>
          </article>

          <article className="card-brand col-span-2">
            <p className="text-sm font-medium opacity-80">Population</p>

            <p className="value">
              {country.population.toLocaleString("pl-PL")}
            </p>
          </article>

          <article className="card col-span-2">
            <p className="label">Capital</p>
            <p className="value">{capitals}</p>
          </article>

          <article className="card-soft col-span-1 md:col-span-2">
            <p className="label">Region</p>
            <p className="value">{country.region}</p>
          </article>

          <article className="card-soft col-span-1 md:col-span-2">
            <p className="label">Subregion</p>
            <p className="value">{country.subregion}</p>
          </article>

          <article className="card col-span-2">
            <h3>Currency</h3>

            <div className="flex flex-wrap gap-2">
              {currencies.length ? (
                currencies.map((currency) => (
                  <span key={currency.name} className="chip">
                    {currency.name} ({currency.symbol})
                  </span>
                ))
              ) : (
                <span className="label">No currency data</span>
              )}
            </div>
          </article>

          <article className="card col-span-2">
            <h3>Languages</h3>

            <div className="flex flex-wrap gap-2">
              {languages.length ? (
                languages.map((language) => (
                  <span key={language.name} className="chip-line">
                    {language.name}
                  </span>
                ))
              ) : (
                <span className="label">No language data</span>
              )}
            </div>
          </article>
        </section>
      )}

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
                href="https://github.com/realNormanik/full-stack-open/tree/main/part7/country-hook"
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