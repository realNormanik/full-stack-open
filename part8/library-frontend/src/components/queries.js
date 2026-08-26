import { gql } from "@apollo/client";

export const MY_GENRES = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      published
      author {
        name
      }
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`;

export const FILTER_BOOKS = gql`
  query($genre: String!) {
    allBooks(genre: $genre) {
      id
      title
      published
      author {
        name
      }
    }
  }
`;