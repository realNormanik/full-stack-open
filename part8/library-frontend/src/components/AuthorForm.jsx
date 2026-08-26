import { useState } from "react";

const AuthorForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, Number(born));
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorForm;