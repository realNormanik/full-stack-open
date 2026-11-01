import { useState } from "react";

const AuthorForm = ({ authors, onSubmit }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || born === "") return;

    await onSubmit(name, Number(born));
    setName("");
    setBorn("");
  };

  return (
    <div className="card-soft">
      <h3>Set birthyear</h3>

      <form onSubmit={handleSubmit} className="stack">
        <div className="field">
          <label htmlFor="author-name" className="label">Name</label>
          <select
            id="author-name"
            className="input"
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option value="" disabled>Select author</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="author-born" className="label">Born</label>
          <input
            id="author-born"
            className="input"
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit" className="create" disabled={!name || born === ""}>update author</button>
      </form>
    </div>
  );
};

export default AuthorForm;