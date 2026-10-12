import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";

import "./index.css";
import reducer from "./reducer";

const store = configureStore({ reducer });

// Face icons
const faces = {
  good: "M528 320C528 205.1 434.9 112 320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM182.3 378.2C178.1 364.5 189.4 352 203.7 352L436.3 352C450.6 352 461.9 364.5 457.7 378.2C439.7 437.1 384.8 480 320 480C255.2 480 200.3 437.1 182.3 378.2zM208 256C208 238.3 222.3 224 240 224C257.7 224 272 238.3 272 256C272 273.7 257.7 288 240 288C222.3 288 208 273.7 208 256zM400 224C417.7 224 432 238.3 432 256C432 273.7 417.7 288 400 288C382.3 288 368 273.7 368 256C368 238.3 382.3 224 400 224z",
  ok: "M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64zM240 304C257.7 304 272 289.7 272 272C272 254.3 257.7 240 240 240C222.3 240 208 254.3 208 272C208 289.7 222.3 304 240 304zM432 272C432 254.3 417.7 240 400 240C382.3 240 368 254.3 368 272C368 289.7 382.3 304 400 304C417.7 304 432 289.7 432 272zM248 384C234.7 384 224 394.7 224 408C224 421.3 234.7 432 248 432L392 432C405.3 432 416 421.3 416 408C416 394.7 405.3 384 392 384L248 384z",
  bad: "M528 320C528 205.1 434.9 112 320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM398.7 448.6C383.7 433 357.6 416 320 416C282.4 416 256.3 433 241.3 448.6C232.1 458.2 216.9 458.5 207.4 449.3C197.9 440.1 197.5 424.9 206.7 415.4C228.8 392.4 266.7 368 320 368C373.3 368 411.2 392.4 433.3 415.4C442.5 425 442.2 440.2 432.6 449.3C423 458.4 407.8 458.2 398.7 448.6zM208 272C208 254.3 222.3 240 240 240C257.7 240 272 254.3 272 272C272 289.7 257.7 304 240 304C222.3 304 208 289.7 208 272zM400 240C417.7 240 432 254.3 432 272C432 289.7 417.7 304 400 304C382.3 304 368 289.7 368 272C368 254.3 382.3 240 400 240z"
};

// Face Component
const Face = ({ name }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    className="h-14 w-14 fill-(--tone) transition group-hover:scale-110"
  >
    <path d={faces[name]} />
  </svg>
);

// Vote Component
const Vote = ({ label, tone, onClick }) => {
  return (
    <button onClick={onClick} className={"group vote " + tone}>
      <Face name={label} />
      {label}
    </button>
  );
};

// Distribution Component
const Distribution = ({ good, ok, bad }) => {
  const total = good + ok + bad;
  const share = (value) => (total === 0 ? 0 : (value / total) * 100);

  return (
    <div
      role="img"
      aria-label={`Distribution of feedback: ${good} good, ${ok} ok, ${bad} bad`}
      className="flex h-4 overflow-hidden rounded-full bg-soft"
    >
      <div className="u2 bg-good" style={{ "--share": `${share(good)}%` }} />
      <div className="u2 bg-ok" style={{ "--share": `${share(ok)}%` }} />
      <div className="u2 bg-bad" style={{ "--share": `${share(bad)}%` }} />
    </div>
  );
};

// Stat Component
const Stat = ({ label, value, tone }) => (
  <div className="card">
    <div className="flex items-center gap-2 text-sm font-semibold text-muted">
      <span className={"h-2 w-2 rounded-full bg-(--tone) " + tone} />
      {label}
    </div>

    <span key={value} className="mt-3 flex sm:block font-display justify-center text-7xl font-black leading-none tabular-nums motion-safe:animate-tick">
      {value}
    </span>
  </div>
);

// Metric Component
const Metric = ({ label, value }) => (
  <div className="px-4 first:pl-0">
    <p className="text-sm font-semibold text-muted">{label}</p>
    <p className="mt-1 font-display text-3xl font-bold tabular-nums">{value}</p>
  </div>
);

// App Component
const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD"
    });
  };

  const ok = () => {
    store.dispatch({
      type: "OK"
    });
  };

  const bad = () => {
    store.dispatch({
      type: "BAD"
    });
  };

  const zero = () => {
    store.dispatch({
      type: "ZERO"
    });
  };

  const state = store.getState();
  const total = state.good + state.ok + state.bad;
  const average = total === 0 ? 0 : (state.good - state.bad) / total;
  const positive = total === 0 ? 0 : (state.good / total) * 100;

  return (
    <div className="relative isolate min-h-screen overflow-hidden px-4 py-12">
      <div aria-hidden="true" className="scanlines" />

      <div className="mx-auto w-full max-w-3xl space-y-8">
        <header>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25">
                <path d="M184 48C170.7 48 160 58.7 160 72C160 110.9 183.4 131.4 199.1 145.1L200.2 146.1C216.5 160.4 224 167.9 224 184C224 197.3 234.7 208 248 208C261.3 208 272 197.3 272 184C272 145.1 248.6 124.6 232.9 110.9L231.8 109.9C215.5 95.7 208 88.1 208 72C208 58.7 197.3 48 184 48zM128 256C110.3 256 96 270.3 96 288L96 480C96 533 139 576 192 576L384 576C425.8 576 461.4 549.3 474.5 512L480 512C550.7 512 608 454.7 608 384C608 313.3 550.7 256 480 256L128 256zM480 448L480 320C515.3 320 544 348.7 544 384C544 419.3 515.3 448 480 448zM320 72C320 58.7 309.3 48 296 48C282.7 48 272 58.7 272 72C272 110.9 295.4 131.4 311.1 145.1L312.2 146.1C328.5 160.4 336 167.9 336 184C336 197.3 346.7 208 360 208C373.3 208 384 197.3 384 184C384 145.1 360.6 124.6 344.9 110.9L343.8 109.9C327.5 95.7 320 88.1 320 72z" />
              </svg>
            </div>
            <span className="font-display text-2xl font-bold uppercase tracking-widest">Unicafe</span>
          </div>

          <h1 className="mt-10">How did we do?</h1>
          <p className="mt-5 text-base text-muted">
            Tell us about your visit. Every answer updates the results right away.
          </p>
        </header>

        <section className="p-4">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <Vote label="good" tone="[--tone:var(--color-good)]" onClick={good} />
            <Vote label="ok" tone="[--tone:var(--color-ok)]" onClick={ok} />
            <Vote label="bad" tone="[--tone:var(--color-bad)]" onClick={bad} />
          </div>
        </section>

        <section className="p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3>Results</h3>

            <button onClick={zero} className="restart">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20">
                <path d="M352 64C352 46.3 337.7 32 320 32C302.3 32 288 46.3 288 64L288 320C288 337.7 302.3 352 320 352C337.7 352 352 337.7 352 320L352 64zM210.3 162.4C224.8 152.3 228.3 132.3 218.2 117.8C208.1 103.3 188.1 99.8 173.6 109.9C107.4 156.1 64 233 64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 233 532.6 156.1 466.3 109.9C451.8 99.8 431.9 103.3 421.7 117.8C411.5 132.3 415.1 152.2 429.6 162.4C479.4 197.2 511.9 254.8 511.9 320C511.9 426 425.9 512 319.9 512C213.9 512 128 426 128 320C128 254.8 160.5 197.1 210.3 162.4z" />
              </svg>

              reset stats
            </button>
          </div>

          <Distribution good={state.good} ok={state.ok} bad={state.bad} />

          <div className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-3">
            <Stat label="good" value={state.good} tone="[--tone:var(--color-good)]" />
            <Stat label="ok" value={state.ok} tone="[--tone:var(--color-ok)]" />
            <Stat label="bad" value={state.bad} tone="[--tone:var(--color-bad)]" />
          </div>

          <div className="mt-6 grid grid-cols-3 divide-x divide-line border-t border-line pt-6">
            <Metric label="all" value={total} />
            <Metric label="average" value={average.toFixed(2)} />
            <Metric label="positive" value={`${positive.toFixed(1)} %`} />
          </div>
        </section>

        {/* Footer */}
        <p className="py-3 mb-0 text-center text-sm text-foreground">
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
                href="https://github.com/realNormanik/full-stack-open/tree/main/part6/unicafe-redux"
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
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);