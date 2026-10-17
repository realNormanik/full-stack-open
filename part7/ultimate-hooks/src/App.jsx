
import useField from "./hooks/useField";
import useResource from "./components/useResource";

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource(
    `${import.meta.env.VITE_API_URL}/api/notes`
  );

  const [persons, personService] = useResource(
    `${import.meta.env.VITE_API_URL}/api/persons`
  );

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.reset();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({
      name: name.value,
      number: number.value,
    });
    name.reset();
    number.reset();
  };

  const handleNoteDelete = (id) => {
    noteService.remove(id);
  };

  const handlePersonDelete = (id) => {
    personService.remove(id);
  };

  return (
    <div>
      <h2>notes</h2>

      <form onSubmit={handleNoteSubmit}>
        <input
          value={content.value}
          onChange={content.onChange}
        />
        <button type="submit">create</button>
      </form>

      {notes.map((n) => (
        <p key={n.id}>
          {n.content}{" "}
          <button
            type="button"
            onClick={() => handleNoteDelete(n.id)}
          >
            delete
          </button>
        </p>
      ))}

      <h2>persons</h2>

      <form onSubmit={handlePersonSubmit}>
        name{" "}
        <input
          value={name.value}
          onChange={name.onChange}
        />
        <br />

        number{" "}
        <input
          value={number.value}
          onChange={number.onChange}
        />

        <button type="submit">create</button>
      </form>

      {persons.map((p) => (
        <p key={p.id}>
          {p.name} {p.number}{" "}
          <button
            type="button"
            onClick={() => handlePersonDelete(p.id)}
          >
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default App;