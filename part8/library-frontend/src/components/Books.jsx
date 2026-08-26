import { useState } from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS, ALL_GENRES, FILTER_BOOKS } from "./queries";

const Books = () => {
  const { loading: loadingGenres, data: genresData } = useQuery(ALL_GENRES);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const { loading: loadingBooks, data: booksData } = useQuery(selectedGenre ? FILTER_BOOKS : ALL_BOOKS, {
    variables: selectedGenre ? { genre: selectedGenre } : undefined,
  });

  if (loadingGenres || loadingBooks) {
    return <div>Loading...</div>;
  };

  const genres = genresData.allGenres;
  const books = booksData.allBooks;

  return (
    <div>
      <h2>Books</h2>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>All</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;