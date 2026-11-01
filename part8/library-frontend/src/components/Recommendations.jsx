import { useQuery, skipToken } from "@apollo/client/react";

import { MY_GENRES, FILTER_BOOKS } from "./queries";

const Recommendations = () => {
  const { loading, error, data } = useQuery(MY_GENRES);

  const favoriteGenre = data?.me?.favoriteGenre ?? null;

  const { loading: booksLoading, error: booksError, data: booksData, } = useQuery(FILTER_BOOKS, favoriteGenre ? { variables: { genre: favoriteGenre } } : skipToken);

  if (loading || booksLoading) {
    return (
      <p className="notice" role="status">
        <span className="spinner" />
        Loading...
      </p>
    );
  };

  if (error || booksError) {
    return (
      <p className="notice text-danger" role="alert">
        Error: {(error || booksError).message}
      </p>
    );
  };

  const books = booksData?.allBooks ?? [];

  return (
    <div className="bento">
      <section className="card-ink md:col-span-4">
        <h2 className="headline">Recommendations</h2>

        <p className="max-w-md text-base leading-relaxed text-white/70">
          Books picked from your favorite genre.
        </p>
      </section>

      <section className="card-brand md:col-span-2">
        <p className="text-sm font-medium opacity-80">Favorite genre</p>
        <p className="font-display text-4xl leading-tight">
          {favoriteGenre || "None yet"}
        </p>
      </section>

      <section className="card md:col-span-6">
        {books.length > 0 ? (
          <ul className="stack">
            {books.map((book) => (
              <li key={book.id} className="row">
                <span className="font-display text-xl">{book.title}</span>
                <span className="chip">{favoriteGenre}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">
            {favoriteGenre ? "No books available for your favorite genre." : "You don't have a favorite genre."}
          </p>
        )}
      </section>
    </div>
  );
};

export default Recommendations;