import { useEffect } from "react";
import { gql, useSubscription, useApolloClient } from "@apollo/client";

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      author {
        name
      }
      id
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      genres
      author {
        name
      }
      id
    }
  }
`;

const BookSubscription = () => {
  const client = useApolloClient();
  const { data } = useSubscription(BOOK_ADDED);

  useEffect(() => {
    if (data) {
      const newBook = data.bookAdded;
      alert(`📚 New book "${newBook.title}" from author ${newBook.author.name}`);

      // Update local cache
      client.cache.updateQuery({ query: ALL_BOOKS }, (oldData) => {
        if (!oldData) return { allBooks: [newBook] };
        return {
          allBooks: [...oldData.allBooks, newBook],
        };
      });
    };
  }, [data, client]);

  return null;
};

export default BookSubscription;