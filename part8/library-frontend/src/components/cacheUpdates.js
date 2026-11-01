import { ALL_BOOKS, ALL_GENRES, FILTER_BOOKS } from "./queries";

export const addBookToCache = (cache, addedBook) => {
  cache.updateQuery({ query: ALL_BOOKS }, (data) => {
    if (!data) return undefined;
    if (data.allBooks.some((b) => b.id === addedBook.id)) return undefined;

    return { allBooks: data.allBooks.concat(addedBook) };
  });

  addedBook.genres.forEach((genre) => {
    cache.updateQuery({ query: FILTER_BOOKS, variables: { genre } }, (data) => {
      if (!data) return undefined;
      if (data.allBooks.some((b) => b.id === addedBook.id)) return undefined;

      return { allBooks: data.allBooks.concat(addedBook) };
    });
  });

  cache.updateQuery({ query: ALL_GENRES }, (data) => {
    if (!data) return undefined;

    const missing = addedBook.genres.filter((g) => !data.allGenres.includes(g));
    if (missing.length === 0) return undefined;

    return { allGenres: data.allGenres.concat(missing) };
  });

  cache.evict({ fieldName: "allAuthors" });
  cache.gc();
};