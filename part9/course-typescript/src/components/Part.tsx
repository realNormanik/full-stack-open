import { ReactNode } from "react";
import { CoursePart } from "../App";

type Tone = "basic" | "group" | "background" | "special";

const tones: Record<Tone, { box: string; chip: string; label: string }> = {
  basic: { box: "card h-full", chip: "chip", label: "Basic" },
  group: { box: "card-ink h-full", chip: "chip", label: "Group" },
  background: { box: "card-brand h-full", chip: "chip-glass", label: "Background" },
  special: { box: "card-soft h-full", chip: "chip-glass", label: "Special" },
};

type ShellProps = {
  part: CoursePart;
  children: ReactNode;
};

const Shell = ({ part, children }: ShellProps) => {
  const tone = tones[part.kind];

  return (
    <article className={tone.box}>
      <div className="part-head">
        <span className={tone.chip}>{tone.label}</span>
        <h3>{part.name}</h3>
        {children}
      </div>
      <div className="part-foot">
        <p className="meta">Exercises</p>
        <p className="value">{part.exerciseCount}</p>
      </div>
    </article>
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <Shell part={part}>
          <em className="note">{part.description}</em>
        </Shell>
      );
    case "group":
      return (
        <Shell part={part}>
          <p className="meta">Project exercises: {part.groupProjectCount}</p>
        </Shell>
      );
    case "background":
      return (
        <Shell part={part}>
          <em className="note">{part.description}</em>
          <p className="meta">
            Background material:{" "}
            <a className="link-inline" href={part.backgroundMaterial}>
              {part.backgroundMaterial}
            </a>
          </p>
        </Shell>
      );
    case "special":
      return (
        <Shell part={part}>
          <em className="note">{part.description}</em>
            <div className="tags">
              <span className="meta w-full">Required skills:</span>
              {part.requirements.map((skill) => (
                <span key={skill} className="chip-glass">
                  <img
                    src={`/${skill}.svg`}
                    alt=""
                    width="20"
                    height="20"
                    style={{
                      display: "inline-block",
                      verticalAlign: "middle",
                      marginRight: "6px",
                    }}
                  />

                  {skill}
                </span>
              ))}
            </div>
        </Shell>
      );
    default:
      // exhaustive check
      const _exhaustiveCheck: never = part;
      return _exhaustiveCheck;
  };
};

export default Part;