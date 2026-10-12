import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null);
    setWeather(null);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const fetchWeather = (capital) => {
    if (!capital) return;

    axios
      .get(`${WEATHER_API_URL}?q=${capital}&appid=${API_KEY}&units=metric`)
      .then((response) => setWeather(response.data))
      .catch(() => setWeather(null));
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    setWeather(null);
    fetchWeather(country.capital?.[0]);
  };

  return (
    <main>
      <div className="mx-auto min-h-screen max-w-6xl px-5 py-6 sm:px-8 lg:px-10">

        {/* Hero */}
        <section className="relative py-10">

          {/* Background glow */}
          <div className="pointer-events-none absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

          <div>
            <div className="flex justify-between">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-2 text-xs font-semibold text-brand">
                ✨ Explore the world
              </div>

              <div className="u4 mb-5 hidden items-center gap-2 rounded-full border border-line bg-panel px-3 py-2 sm:flex">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full bg-success" />
                </span>

                Live data
              </div>
            </div>

            <h1>
              Discover
              <br />
              <span className="text-brand">everywhere.</span>
            </h1>

            <p className="mt-6 text-base leading-7 text-muted">
              Search countries, explore essential facts and check the current weather of their capitals.
            </p>
          </div>

          {/* Search */}
          <div className="relative mt-10">
            <div className="absolute -inset-1 rounded-2xl bg-brand/10 opacity-0 blur transition-opacity focus-within:opacity-100" />

            <div className="relative flex items-center rounded-2xl border border-line bg-panel p-2 shadow-sm transition-shadow focus-within:border-brand/40 focus-within:shadow-xl focus-within:shadow-brand/5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-soft text-lg text-muted">
                🔎
              </div>

              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search for a country..."
              />

              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCountry(null);
                    setWeather(null);
                  }}
                  className="mr-2 flex h-9 w-9 items-center justify-center rounded-lg fill-muted transition hover:bg-soft hover:fill-foreground"
                  aria-label="Clear search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20">
                    <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        {search && !selectedCountry && (
          <section>

            {filteredCountries.length > 10 && (
              <div className="rounded-2xl border border-warning/20 bg-warning-soft px-5 py-4">
                <p className="font-semibold text-foreground">
                  Too many matches
                </p>

                <p className="mt-1 text-sm text-muted">
                  Keep typing to narrow down the results.
                </p>
              </div>
            )}

            {filteredCountries.length <= 10 &&
              filteredCountries.length > 1 && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-eighteen text-muted">
                      Search results
                    </p>

                    <span className="rounded-full bg-soft px-2.5 py-1 text-xs font-semibold text-muted">
                      {filteredCountries.length}
                    </span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {filteredCountries.map((country) => (
                      <button
                        key={country.cca3}
                        onClick={() => handleShowCountry(country)}
                        className="group flex items-center gap-4 rounded-2xl border border-line bg-panel p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-black/5"
                      >
                        <div className="flex h-11 w-15 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-soft">
                          <img
                            src={country.flags.png}
                            alt=""
                            className="min-h-11 min-w-15"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-foreground">
                            {country.name.common}
                          </p>

                          <p className="u4 mt-1 truncate">
                            {country.capital?.[0] || "No capital"}
                          </p>
                        </div>

                        <span className="fill-muted transition group-hover:translate-x-1 group-hover:text-brand">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30" height="20">
                            <path d="M541.9 139.5C546.4 127.7 543.6 114.3 534.7 105.4C525.8 96.5 512.4 93.6 500.6 98.2L84.6 258.2C71.9 263 63.7 275.2 64 288.7C64.3 302.2 73.1 314.1 85.9 318.3L262.7 377.2L321.6 554C325.9 566.8 337.7 575.6 351.2 575.9C364.7 576.2 376.9 568 381.8 555.4L541.8 139.4z" />
                          </svg>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {filteredCountries.length === 1 && (
              <button
                onClick={() => handleShowCountry(filteredCountries[0])}
                className="group flex w-full items-center gap-5 rounded-3xl border border-line bg-panel p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-xl"
              >
                <div className="h-20 w-28 shrink-0 overflow-hidden rounded-2xl">
                  <img
                    src={filteredCountries[0].flags.png}
                    alt=""
                    className="min-h-20 min-w-28"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-eighteen text-brand">
                    Exact match
                  </p>

                  <p className="mt-1 font-display text-3xl font-bold text-foreground">
                    {filteredCountries[0].name.common}
                  </p>
                </div>

                <span className="hidden fill-muted transition group-hover:translate-x-1 group-hover:text-brand sm:block">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="45" height="30">
                    <path d="M541.9 139.5C546.4 127.7 543.6 114.3 534.7 105.4C525.8 96.5 512.4 93.6 500.6 98.2L84.6 258.2C71.9 263 63.7 275.2 64 288.7C64.3 302.2 73.1 314.1 85.9 318.3L262.7 377.2L321.6 554C325.9 566.8 337.7 575.6 351.2 575.9C364.7 576.2 376.9 568 381.8 555.4L541.8 139.4z" />
                  </svg>
                </span>
              </button>
            )}

            {filteredCountries.length === 0 && (
              <div className="rounded-3xl border border-dashed border-line bg-panel p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-xl text-muted">
                  ❓
                </div>

                <p className="mt-5 font-display text-2xl font-bold text-foreground">
                  No country found
                </p>

                <p className="mt-2 text-sm text-muted">
                  Try another country name.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Country */}
        {selectedCountry && (
          <section>

            {/* Country hero */}
            <div className="grid overflow-hidden rounded-4xl border border-line bg-panel shadow-xl shadow-black/5 lg:grid-cols-[1.15fr_0.85fr]">

              <div className="relative p-7">
                <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

                <div className="relative">
                  <div className="mb-8 flex items-center gap-2">
                    <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-sixteen text-brand">
                      {selectedCountry.cca3}
                    </span>

                    <span className="u4">
                      Country profile
                    </span>
                  </div>

                  <h2>{selectedCountry.name.common}</h2>

                  <p className="mt-5 max-w-lg text-sm leading-6 text-muted">
                    {selectedCountry.name.official}
                  </p>

                  {/* Facts */}
                  <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-soft p-4">
                      <p className="text-xs font-bold uppercase tracking-fourteen text-muted">
                        Capital
                      </p>

                      <p className="u3 truncate">
                        {selectedCountry.capital?.[0] || "-"}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-soft p-4">
                      <p className="text-xs font-bold uppercase tracking-fourteen text-muted">
                        Area
                      </p>

                      <p className="u3">
                        {selectedCountry.area.toLocaleString()} km²
                      </p>
                    </div>

                    <div className="col-span-2 rounded-2xl bg-soft p-4 sm:col-span-1">
                      <p className="text-xs font-bold uppercase tracking-fourteen text-muted">
                        Languages
                      </p>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {Object.values(selectedCountry.languages).map(
                          (language) => (
                            <span
                              key={language}
                              className="rounded-md bg-panel px-2 py-1 text-xs font-medium text-foreground"
                            >
                              {language}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flag */}
              <div className="relative min-h-70 bg-soft p-4">
                <div className="overflow-hidden rounded-4xl">
                  <img
                    src={selectedCountry.flags.svg}
                    alt={`Flag of ${selectedCountry.name.common}`}
                    className="min-h-70"
                  />
                </div>

                <div className="absolute right-7 bottom-7 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-bold uppercase tracking-fourteen text-white backdrop-blur-md">
                  National flag
                </div>
              </div>
            </div>

            {/* Weather */}
            {weather && (
              <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">

                <div className="rounded-4xl border border-line bg-panel p-7">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-eighteen text-brand">
                        Current weather
                      </p>

                      <h3>{selectedCountry.capital?.[0]}</h3>

                      <p className="mt-1 text-sm capitalize text-muted">
                        {weather.weather[0].description}
                      </p>
                    </div>

                    <div className="u2 bg-brand-soft">
                      ☁️
                    </div>
                  </div>

                  <div className="mt-10 flex items-end gap-3">
                    <span className="font-display text-7xl font-bold leading-none text-foreground">
                      {Math.round(weather.main.temp)}
                    </span>

                    <span className="mb-1 font-display text-3xl text-muted">
                      °C
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-4xl border border-line bg-panel p-7">
                    <div className="u2 bg-soft">
                      🍃
                    </div>

                    <p className="mt-8 text-xs font-bold uppercase tracking-sixteen text-muted">
                      Wind
                    </p>

                    <p className="mt-2 font-display text-3xl font-bold text-foreground">
                      {weather.wind.speed}
                    </p>

                    <p className="u4">
                      m/s
                    </p>
                  </div>

                  <div className="rounded-4xl border border-line bg-panel p-7">
                    <div className="u2 bg-soft">
                      💧
                    </div>

                    <p className="mt-8 text-xs font-bold uppercase tracking-sixteen text-muted">
                      Humidity
                    </p>

                    <p className="mt-2 font-display text-3xl font-bold text-foreground">
                      {weather.main.humidity}
                    </p>

                    <p className="u4">
                      percent
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Initial state */}
        {!search && !selectedCountry && (
          <section className="relative overflow-hidden rounded-4xl border border-line bg-panel p-10">
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-xl text-brand">
                🌍
              </div>

              <h2 className="mt-7">
                Where should we go?
              </h2>

              <p className="mt-3 max-w-md leading-7 text-muted">
                Start typing a country above and explore its flag,
                capital, languages, area and current weather.
              </p>
            </div>
          </section>
        )}

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-muted">
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
                href="https://github.com/realNormanik/full-stack-open/tree/main/part2/countries"
                className="u1 focus:text-g-100 hover:text-[#a6a6a6] text-white text-base font-mono no-underline px-6 pt-[.1875rem] pb-6 m-0 -mb-5 transition-colors duration-[150ms] ease-[cubic-bezier(1,-.115,.975,.855)]"
              >
                <p className="text-current font-normal text-base mt-4 mb-4">
                  View on GitHub
                </p>

                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" aria-hidden="true" width="35" height="35">
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default App;