import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { MY_GENRES, FILTER_BOOKS } from "./queries";

const Recommendations = () => {
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (user) {
      setFavoriteGenre(user.favoriteGenre);
    }
  }, [user]);

  const { loading, error, data } = useQuery(MY_GENRES, {
    context: {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    },
    onCompleted: (data) => {
      const updatedUser = { ...user, favoriteGenre: data.me.favoriteGenre };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  });

  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(FILTER_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre
  });

  if (loading || booksLoading) {
    return <div>Loading...</div>;
  };

  if (error || booksError) {
    return <div>Error: {error.message}</div>;
  };

  if (booksData && booksData.allBooks.length > 0) {
    return (
      <div>
        <h2>Recommendations:</h2>
        <ul>
          {booksData.allBooks.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h2>Recommendations:</h2>
      {favoriteGenre ? (
        <p>{favoriteGenre}</p>
      ) : (
        <p>You don"t have a favorite genre.</p>
      )}
      <p>No books available for your favorite genre.</p>
    </div>
  );
};

export default Recommendations;