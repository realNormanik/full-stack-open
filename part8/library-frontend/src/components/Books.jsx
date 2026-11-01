import { useState } from "react";
import { useQuery } from "@apollo/client/react";

import { ALL_BOOKS, ALL_GENRES, FILTER_BOOKS } from "./queries";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const { loading: loadingGenres, error: genresError, data: genresData } = useQuery(ALL_GENRES);

  const {
    loading: loadingBooks,
    error: booksError,
    data: booksData,
  } = useQuery(selectedGenre ? FILTER_BOOKS : ALL_BOOKS, {
    variables: selectedGenre ? { genre: selectedGenre } : undefined,
  });

  if (loadingGenres || (loadingBooks && !booksData)) {
    return (
      <p className="notice" role="status">
        <span className="spinner" />
        Loading...
      </p>
    );
  };

  if (genresError || booksError) {
    return (
      <p className="notice text-danger" role="alert">
        Error: {(genresError || booksError).message}
      </p>
    );
  };

  const genres = genresData.allGenres;
  const books = booksData?.allBooks ?? [];

  return (
    <div className="bento">
      <section className="card-ink md:col-span-4">
        <h2 className="headline">Books</h2>

        <p className="max-w-md text-base leading-relaxed text-white/70">
          {selectedGenre ? `Showing books in the ${selectedGenre} genre.` : "Browse the whole collection or filter by genre."}
        </p>
      </section>

      <section className="card-brand md:col-span-2">
        <p className="text-sm font-medium opacity-80">Books shown</p>
        <p className="value">{books.length}</p>
      </section>

      <section className="card md:col-span-6">
        <div className="flex flex-wrap gap-2">
          <button
            className="pill"
            data-active={selectedGenre === null}
            onClick={() => setSelectedGenre(null)}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              className="pill"
              data-active={selectedGenre === genre}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {books.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id}>
                  <td className="font-display text-xl">{b.title}</td>
                  <td>{b.author.name}</td>
                  <td className="text-muted">{b.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty">No books found.</p>
        )}
      </section>
    </div>
  );
};

export default Books;