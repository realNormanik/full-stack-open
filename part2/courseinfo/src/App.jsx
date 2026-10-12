import Course from "./Course";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        { name: "Fundamentals of React", exercises: 10, id: 1 },
        { name: "Using props to pass data", exercises: 7, id: 2 },
        { name: "State of a component", exercises: 14, id: 3 },
        { name: "Redux", exercises: 11, id: 4 },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        { name: "Routing", exercises: 3, id: 1 },
        { name: "Middlewares", exercises: 7, id: 2 },
      ],
    },
  ];

  const allParts = courses.flatMap((course) => course.parts);
  const totalExercises = allParts.reduce((sum, part) => sum + part.exercises, 0);
  const maxExercises = Math.max(...allParts.map((part) => part.exercises));

  const stats = [
    { label: "Courses", value: courses.length },
    { label: "Modules", value: allParts.length },
    { label: "Exercises", value: totalExercises },
  ];

  return (
    <main>
      <div className="mx-auto min-h-screen max-w-5xl px-5">
        {/* Hero */}
        <section className="py-16">
          <h1>
            Learn.
            <br />
            Build more.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Follow your progress through React, Node.js and the technologies
            that make up modern full-stack applications.
          </p>

          <dl className="mt-12 grid max-w-xl grid-cols-3 border-y border-line">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-l border-line py-5 pl-5 first:border-l-0 first:pl-0"
              >
                <dt className="text-sm text-muted">{stat.label}</dt>
                <dd className="mt-1 font-display text-4xl font-semibold tabular-nums text-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Courses */}
        <section aria-label="Courses">
          {courses.map((course) => (
            <Course key={course.id} course={course} max={maxExercises} />
          ))}
        </section>

        {/* Footer */}
        <p className="mt-8 border-t border-line py-10 text-center text-sm text-muted">
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
                href="https://github.com/realNormanik/full-stack-open/tree/main/part2/courseinfo"
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
    </main>
  );
};

export default App;