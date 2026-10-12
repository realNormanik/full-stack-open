// Header component – sticky title column on large screens
const Header = ({ course, modules }) => (
  <header>
    <h2>{course}</h2>

    <p className="mt-3 text-sm text-muted">
      {modules} {modules === 1 ? "module" : "modules"}
    </p>
  </header>
);

// Part component – bar width is relative to the biggest module across all courses
const Part = ({ name, exercises, index, max }) => (
  <li className="grid grid-cols-[1.75rem_1fr_auto] items-baseline gap-x-4 gap-y-3 border-b border-line py-5 first:pt-0">
    <span className="text-sm tabular-nums text-muted">{index + 1}</span>

    <p className="min-w-0 truncate font-medium text-foreground">{name}</p>

    <p className="text-sm tabular-nums text-muted">
      <span className="font-display text-xl font-semibold text-foreground">
        {exercises}
      </span>{" "}
      exercises
    </p>

    <div
      className="col-span-2 col-start-2 h-1 overflow-hidden rounded-full bg-soft"
      role="presentation"
    >
      <div
        className="h-full origin-left rounded-full bg-brand motion-safe:animate-grow"
        style={{
          width: `${(exercises / max) * 100}%`,
          animationDelay: `${index * 90}ms`,
        }}
      />
    </div>
  </li>
);

// Content component
const Content = ({ parts, max }) => (
  <ol>
    {parts.map((part, index) => (
      <Part
        key={part.id}
        name={part.name}
        exercises={part.exercises}
        index={index}
        max={max}
      />
    ))}
  </ol>
);

// Total component
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div className="mt-6 flex items-center justify-between rounded-xl bg-brand-soft px-5 py-4">
      <p className="text-sm font-medium text-foreground">
        Total across all modules
      </p>

      <p className="text-sm text-muted">
        <span className="font-display text-2xl font-semibold tabular-nums text-brand">
          {total}
        </span>{" "}
        exercises
      </p>
    </div>
  );
};

// Course component
const Course = ({ course, max }) => (
  <article className="grid gap-8 border-t border-line py-12 lg:grid-cols-[17rem_1fr] lg:gap-16">
    <Header course={course.name} modules={course.parts.length} />

    <div>
      <Content parts={course.parts} max={max} />
      <Total parts={course.parts} />
    </div>
  </article>
);

export default Course;