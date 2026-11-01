import { useState } from "react";
import { useMutation } from "@apollo/client/react";

import { ADD_BOOK } from "./mutations";
import { addBookToCache } from "./cacheUpdates";

const NewBook = ({ setPage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [addBook] = useMutation(ADD_BOOK, {
    update: (cache, { data }) => {
      if (data?.addBook) {
        addBookToCache(cache, data.addBook);
      };
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      await addBook({
        variables: {
          title,
          author,
          published: Number(published),
          genres,
        },
      });

      setTitle("");
      setAuthor("");
      setPublished("");
      setGenres([]);
      setGenre("");
      setPage("books");
    } catch (error) {
      setErrorMessage(error.message);
    };
  };

  const addGenre = () => {
    const trimmed = genre.trim();

    if (trimmed && !genres.includes(trimmed)) {
      setGenres(genres.concat(trimmed));
    };

    setGenre("");
  };

  return (
    <div className="bento">
      <section className="card-ink md:col-span-4">
        <h2 className="headline">Add book</h2>

        <p className="max-w-md text-base leading-relaxed text-white/70">
          Add a new title to the library. The author is created if needed.
        </p>
      </section>

      <section className="card-brand md:col-span-2">
        <p className="text-sm font-medium opacity-80">Genres added</p>
        <p className="value">{genres.length}</p>
      </section>

      <form onSubmit={submit} className="card md:col-span-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="field md:col-span-2">
            <label htmlFor="book-title" className="label">Title</label>
            <input
              id="book-title"
              className="input"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="book-published" className="label">Published</label>
            <input
              id="book-published"
              className="input"
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </div>

          <div className="field md:col-span-3">
            <label htmlFor="book-author" className="label">Author</label>
            <input
              id="book-author"
              className="input"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="book-genre" className="label">Genres</label>
          <div className="flex gap-2">
            <input
              id="book-genre"
              className="input"
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <button onClick={addGenre} type="button" className="ghost shrink-0">add genre</button>
          </div>
        </div>

        {genres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <span key={g} className="chip">{g}</span>
            ))}
          </div>
        )}

        {errorMessage && (
          <p className="notice text-danger" role="alert">{errorMessage}</p>
        )}

        <button type="submit" className="create self-start">create book</button>
      </form>
    </div>
  );
};

export default NewBook;