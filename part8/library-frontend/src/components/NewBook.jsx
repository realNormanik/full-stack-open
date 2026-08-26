import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_BOOK } from "./mutations";
import { ALL_BOOKS, ALL_AUTHORS } from "./queries";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  });

  const submit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      console.error("User not found or token is missing");
      return;
    };

    try {
      const { data } = await addBook({
        variables: {
          title,
          author,
          published: Number(published),
          genres
        },
        context: {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      });

      console.log("Book added:", data.addBook);

      // Reset form fields after successful submission
      setTitle("");
      setAuthor("");
      setPublished("");
      setGenres([]);
      setGenre("");
      setPage("books");
    } catch (error) {
      console.error("Error adding book:", error);
    };
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <h2>Add book</h2>
      <form onSubmit={submit}>
        <div>
          title <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;