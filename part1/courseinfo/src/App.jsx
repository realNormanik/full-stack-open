// Header component
const Header = ({ course, parts }) => (
  <header>
    <div className="flex gap-8 items-start justify-between">
      <div>
        <div className="u2 mb-7 flex gap-3 items-center text-xs font-medium uppercase tracking-eighteen text-text-muted">
          <span className="h-px w-8 bg-accent" />
          Full Stack Open
          <span>/</span>
          Part 1
        </div>

        <h1>{course}</h1>

        <p className="mt-6 text-base leading-7 text-text-secondary">
          A practical introduction to building modern web applications with React.
        </p>
      </div>

      <div className="hidden shrink-0 text-right sm:block">
        <p className="u2 text-xs uppercase tracking-eighteen text-text-muted">
          Sections
        </p>

        <p className="mt-1 font-u2 text-4xl font-medium tracking-tight">
          {String(parts.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  </header>
);


// Part component
const Part = ({ name, exercises, index }) => (
  <article className="group">
    {/* Number */}
    <div className="self-start pt-1">
      <span className="u2 text-xs text-text-muted">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>

    {/* Content */}
    <div>
      <h3>{name}</h3>

      <div className="mt-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-positive" />

        <span className="text-xs text-text-muted">
          Course section
        </span>
      </div>
    </div>

    {/* Exercises */}
    <div className="text-right">
      <div className="flex items-baseline justify-end gap-2">
        <span className="font-u2 text-2xl font-medium tracking-tight text-text">
          {exercises}
        </span>

        <span className="hidden text-xs text-text-muted sm:inline">
          exercises
        </span>
      </div>

      <div className="mt-2 ml-auto h-[2px] w-10 bg-border transition-all duration-300 group-hover:w-full group-hover:bg-accent" />
    </div>
  </article>
);


// Content component
const Content = ({ parts }) => (
  <div>
    {parts.map((part, index) => (
      <Part
        key={part.name}
        name={part.name}
        exercises={part.exercises}
        index={index}
      />
    ))}
  </div>
);

// Total component
const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div className="grid gap-8 border-t border-border px-5 py-8 items-center sm:grid-cols-[1fr_auto] sm:items-end sm:px-7">
      <div>
        <p className="u2 text-xs uppercase tracking-eighteen text-text-muted">
          Course total
        </p>

        <h2>Number of exercises</h2>
      </div>

      <div className="flex items-end gap-4">
        <span className="u2 text-5xl font-medium leading-none text-accent">
          {totalExercises}
        </span>

        <span className="mb-1 text-sm text-text-muted">
          exercises
        </span>
      </div>
    </div>
  );
};


// Main App component
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <main>
      <div className="mx-auto max-w-5xl">
        <Header course={course.name} parts={course.parts} />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_260px] lg:items-start">
          {/* Main curriculum */}
          <section className="u3 overflow-hidden border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border px-5 py-5 sm:px-7">
              <div>
                <p className="u2 text-xs uppercase tracking-eighteen text-text-muted">
                  Curriculum
                </p>

                <h2>Course parts</h2>
              </div>

              <span className="u2 text-xs text-text-muted">
                {String(course.parts.length).padStart(2, "0")} sections
              </span>
            </div>

            <Content parts={course.parts} />

            <Total parts={course.parts} />
          </section>

          {/* Side information */}
          <aside className="hidden lg:block">
            <div className="border-t-2 border-accent pt-4">
              <p className="u2 text-xs uppercase tracking-eighteen text-text-muted">
                About this course
              </p>

              <p className="mt-4 text-sm leading-6 text-text-secondary">
                Learn the fundamentals of React and build a strong
                foundation for modern full-stack web development.
              </p>
            </div>

            <div className="mt-10 border-t border-border pt-4">
              <p className="u2 text-xs uppercase tracking-eighteen text-text-muted">
                Technology
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {/* React */}
                <span className="u4" title="React">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20" className="fill-cyan-400">
                    <path d="M482.2 241.2C476.8 239.4 471.4 237.7 466 236.1C466.9 232.4 467.7 228.7 468.5 225C480.8 165.4 472.7 117.5 445.4 101.7C419.1 86.6 376.2 102.3 332.8 140.1C328.5 143.8 324.3 147.7 320.3 151.6C317.6 149 314.8 146.4 312 143.9C266.5 103.5 220.9 86.5 193.6 102.4C167.4 117.6 159.6 162.7 170.6 219.1C171.7 224.7 172.9 230.2 174.3 235.8C167.9 237.6 161.6 239.6 155.7 241.7C102.3 260.2 64 289.4 64 319.6C64 350.8 104.8 382.1 160.3 401.1C164.8 402.6 169.3 404.1 173.9 405.4C172.4 411.4 171.1 417.3 169.9 423.4C159.4 478.9 167.6 522.9 193.8 538C220.8 553.6 266.2 537.6 310.4 498.9C313.9 495.8 317.4 492.6 320.9 489.2C325.3 493.5 329.9 497.6 334.5 501.6C377.3 538.4 419.6 553.3 445.7 538.2C472.7 522.6 481.5 475.3 470.1 417.7C469.2 413.3 468.2 408.8 467.1 404.2C470.3 403.3 473.4 402.3 476.5 401.3C534.2 382.2 576 351.3 576 319.6C576 289.3 536.6 259.9 482.2 241.2zM346.9 156.3C384.1 123.9 418.8 111.2 434.6 120.3C451.5 130 458 169.2 447.4 220.7C446.7 224.1 446 227.4 445.1 230.7C422.9 225.7 400.4 222.1 377.8 220.1C364.8 201.5 350.6 183.7 335.2 167C339.1 163.3 342.9 159.8 346.9 156.3zM231.2 371.5C236.3 380.2 241.5 388.9 247 397.4C231.4 395.7 215.9 393.2 200.6 389.9C205 375.5 210.5 360.6 216.9 345.4C221.5 354.2 226.2 362.9 231.2 371.5zM200.9 251.2C215.3 248 230.6 245.4 246.5 243.4C241.2 251.7 236 260.2 231.1 268.8C226.2 277.3 221.4 286 216.9 294.8C210.6 279.9 205.3 265.3 200.9 251.2zM228.3 320.1C234.9 306.3 242.1 292.8 249.7 279.5C257.3 266.2 265.5 253.3 274.1 240.6C289.1 239.5 304.4 238.9 320 238.9C335.6 238.9 351 239.5 365.9 240.6C374.4 253.2 382.5 266.1 390.2 279.3C397.9 292.5 405.1 306 411.9 319.7C405.2 333.5 398 347.1 390.3 360.5C382.7 373.8 374.6 386.7 366.1 399.5C351.2 400.6 335.7 401.1 320 401.1C304.3 401.1 289.1 400.6 274.4 399.7C265.7 387 257.5 374 249.8 360.7C242.1 347.4 235 333.9 228.3 320.1zM408.9 371.3C414 362.5 418.8 353.6 423.5 344.6C429.9 359.1 435.5 373.8 440.4 388.9C424.9 392.4 409.2 395.1 393.4 396.9C398.8 388.5 403.9 379.9 408.9 371.3zM423.3 294.8C418.6 286 413.8 277.2 408.8 268.6C403.9 260.1 398.8 251.7 393.5 243.4C409.6 245.4 425 248.1 439.4 251.4C434.8 266.2 429.4 280.6 423.3 294.8zM320.2 182.3C330.7 193.7 340.6 205.7 349.8 218.1C330 217.2 310.1 217.2 290.3 218.1C300.1 205.2 310.2 193.2 320.2 182.3zM204.2 121C221 111.2 258.3 125.2 297.6 160C300.1 162.2 302.6 164.6 305.2 167C289.7 183.7 275.4 201.5 262.3 220.1C239.7 222.1 217.3 225.6 195.1 230.5C193.8 225.4 192.7 220.2 191.6 215C182.2 166.6 188.4 130.1 204.2 121zM179.7 384.6C175.5 383.4 171.4 382.1 167.3 380.7C146 374 121.8 363.4 104.3 349.5C94.2 342.5 87.4 331.7 85.5 319.6C85.5 301.3 117.1 277.9 162.7 262C168.4 260 174.2 258.2 180 256.5C186.8 278.2 195 299.5 204.5 320.1C194.9 341 186.6 362.6 179.7 384.6zM296.3 482.6C279.8 497.7 260.7 509.7 239.9 517.9C228.8 523.2 216 523.7 204.6 519.2C188.7 510 182.1 474.7 191.1 427.2C192.2 421.6 193.4 416 194.8 410.5C217.2 415.3 239.8 418.6 262.7 420.3C275.9 439 290.4 456.9 305.9 473.7C302.7 476.8 299.5 479.8 296.3 482.6zM320.8 458.3C310.6 447.3 300.4 435.1 290.5 422C300.1 422.4 310 422.6 320 422.6C330.3 422.6 340.4 422.4 350.4 421.9C341.2 434.6 331.3 446.7 320.8 458.3zM451.5 488.3C450.6 500.5 444.6 511.9 435 519.6C419.1 528.8 385.2 516.8 348.6 485.4C344.4 481.8 340.2 477.9 335.9 473.9C351.2 457 365.3 439.1 378.1 420.3C401 418.4 423.8 414.9 446.3 409.8C447.3 413.9 448.2 418 449 422C453.9 443.6 454.7 466.1 451.5 488.3zM469.7 380.8C466.9 381.7 464.1 382.6 461.2 383.4C454.2 361.6 445.6 340.3 435.7 319.6C445.3 299.2 453.4 278.2 460.2 256.7C465.4 258.2 470.4 259.8 475.2 261.4C521.8 277.4 554.5 301.2 554.5 319.4C554.5 339 519.6 364.3 469.7 380.8zM320 365.8C345.3 365.8 365.8 345.3 365.8 320C365.8 294.7 345.3 274.2 320 274.2C294.7 274.2 274.2 294.7 274.2 320C274.2 345.3 294.7 365.8 320 365.8z" />
                  </svg>

                  <span>React</span>
                </span>

                {/* JavaScript */}
                <span className="u4" title="JavaScript">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20" className="fill-yellow-300">
                    <path d="M96 96L96 544L544 544L544 96L96 96zM339.8 445.4C339.8 489 314.2 508.9 276.9 508.9C243.2 508.9 223.7 491.5 213.7 470.4L248 449.7C254.6 461.4 260.6 471.3 275.1 471.3C288.9 471.3 297.7 465.9 297.7 444.8L297.7 301.7L339.8 301.7L339.8 445.4zM439.4 508.9C400.3 508.9 375 490.3 362.7 465.9L397 446.1C406 460.8 417.8 471.7 438.5 471.7C455.9 471.7 467.1 463 467.1 450.9C467.1 436.5 455.7 431.4 436.4 422.9L425.9 418.4C395.5 405.5 375.4 389.2 375.4 354.9C375.4 323.3 399.5 299.3 437 299.3C463.8 299.3 483 308.6 496.8 333L464 354C456.8 341.1 449 336 436.9 336C424.6 336 416.8 343.8 416.8 354C416.8 366.6 424.6 371.7 442.7 379.6L453.2 384.1C489 399.4 509.1 415.1 509.1 450.3C509.1 488.1 479.3 508.9 439.4 508.9z" />
                  </svg>

                  <span>JavaScript</span>
                </span>

                {/* TailwindCSS */}
                <span className="u4" title="TailwindCSS">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20" className="fill-sky-400">
                    <path d="M320 128C234.7 128 181.3 170.7 160 256C192 213.3 229.3 197.3 272 208C296.3 214.1 313.7 231.8 333 251.3C364.4 283.1 400.7 320 480 320C565.3 320 618.7 277.3 640 192C608 234.7 570.7 250.7 528 240C503.7 233.9 486.3 216.2 467 196.7C435.6 164.9 399.3 128 320 128zM160 320C74.7 320 21.3 362.7 0 448C32 405.3 69.3 389.3 112 400C136.3 406.1 153.7 423.8 173 443.3C204.4 475.1 240.7 512 320 512C405.3 512 458.7 469.3 480 384C448 426.7 410.7 442.7 368 432C343.7 425.9 326.3 408.2 307 388.7C275.6 356.9 239.3 320 160 320z" />
                  </svg>

                  <span>TailwindCSS</span>
                </span>
              </div>
            </div>

            <div className="mt-10 border-t border-border pt-4">
              <p className="u2 text-xs uppercase tracking-eighteen text-text-muted">
                Status
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span class="relative flex size-2">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-75"></span>
                  <span class="relative inline-flex size-2 rounded-full bg-positive"></span>
                </span>

                <span className="text-sm font-semibold">
                  In progress
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer>
          <p className="mt-8 text-center text-sm text-text-muted">
            Built with React & Tailwind CSS
          </p>

          {/* GitHub */}
          <aside className="github">
            <div className="z-2 fixed bottom-0 right-0 h-50 w-50 overflow-hidden after:absolute after:bottom-0 after:left-0 after:right-0 after:z-0 after:block after:border-b-[12.5rem] after:border-b-[#343535] after:border-l-[12.5rem] after:border-l-transparent after:border-t-[12.5rem] after:border-t-transparent">
              <div className="u1 z-1 absolute right-0 top-0 h-full w-full -rotate-45 justify-end">
                <a
                  target="_blank"
                  rel="noreferrer"
                  aria-label="github-repo"
                  href="https://github.com/realNormanik/full-stack-open/tree/main/part1/courseinfo"
                  className="u1 -mb-5 m-0 px-6 pb-6 pt-[.1875rem] font-mono text-base text-white no-underline transition-colors duration-[150ms] ease-[cubic-bezier(1,-.115,.975,.855)] hover:text-[#a6a6a6] focus:text-g-100"
                >
                  <p className="mb-4 mt-4 text-base font-normal text-current">
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