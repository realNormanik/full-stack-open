import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/index";

export default function CreateAnecdote({ newAnecdote, setSuccessMessage }) {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const navigate = useNavigate();

  const fields = [
    { id: "content", label: "Content", field: content },
    { id: "author", label: "Author", field: author },
    { id: "info", label: "Url", field: info }
  ];

  const resetAll = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newAnecdote({
      content: content.value,
      author: author.value,
      info: info.value
    });

    setSuccessMessage(`Anecdote "${content.value}" has been added!`);
    setTimeout(() => setSuccessMessage(""), 5000);

    resetAll();
    navigate("/");
  };

  return (
    <div className="page">
      <h1>New Anecdote</h1>

      <section className="p-6">
        <form onSubmit={handleSubmit}>
          {fields.map(({ id, label, field }) => (
            <div key={id}>
              <label htmlFor={id}>{label}</label>
              <input
                id={id}
                type={field.type}
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          ))}

          <div className="mt-2 flex gap-3">
            <button type="submit" className="menu hover:scale-105 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="15" height="15">
                <path d="M468 64C487.2 64 505.6 71.6 519.1 85.2L554.8 120.9C568.4 134.4 576 152.8 576 172C576 191.2 568.4 209.6 554.8 223.1L509.9 268L372 130.1L416.9 85.2C430.4 71.6 448.8 64 468 64zM338.1 164L338.1 164L476 301.9L260.9 517C250.2 527.7 236.8 535.5 222.2 539.6L94.4 575.1C86.1 577.4 77.1 575.1 71 568.9C64.9 562.7 62.5 553.8 64.8 545.5L100.4 417.8C104.5 403.2 112.2 389.9 123 379.1L304.1 197.9L287 180.9C277.6 171.5 262.4 171.5 253.1 180.9L153 281C143.6 290.4 128.4 290.4 119.1 281C109.8 271.6 109.7 256.4 119.1 247.1L219.1 146.9C247.2 118.8 292.8 118.8 320.9 146.9L338.1 164z" />
              </svg>

              Create
            </button>

            <button type="button" className="ghost" onClick={resetAll}>Clear</button>
          </div>
        </form>
      </section>
    </div>
  );
};