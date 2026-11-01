import { CoursePart } from "../App";

type TotalProps = {
  parts: CoursePart[];
};

const Total = ({ parts }: TotalProps) => {
  const total = parts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <section
      className="card-brand animate-rise md:col-span-2"
      style={{ animationDelay: "120ms" }}
    >
      <p className="meta">Number of exercises</p>
      <p className="value">{total}</p>
    </section>
  );
};

export default Total;