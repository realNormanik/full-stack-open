import Part from "./Part";
import { CoursePart } from "../App";

type ContentProps = {
  parts: CoursePart[];
};

const Content = ({ parts }: ContentProps) => {
  return (
    <div className="contents">
      {parts.map((part, i) => (
        <div
          key={i}
          className="animate-rise md:col-span-3"
          style={{ animationDelay: `${180 + i * 70}ms` }}
        >
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

export default Content;