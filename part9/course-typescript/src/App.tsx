import Total from "./components/Total";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";

// --- INTERFACES ---

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  kind: string;
};

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
};

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic";
};

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
};

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background";
};

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special";
};

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

// --- DATA ---

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

// --- APP ---

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <main>
      <div className="bento">
        <Header name={courseName} />
        <Total parts={courseParts} />
        <Content parts={courseParts} />
      </div>

      <Footer />
    </main>
  );
};

export default App;