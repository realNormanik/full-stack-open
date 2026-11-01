import { useSubscription } from "@apollo/client/react";

import { BOOK_ADDED } from "./queries";
import { addBookToCache } from "./cacheUpdates";

const BookSubscription = () => {
  useSubscription(BOOK_ADDED, {
    onData: ({ client, data }) => {
      const addedBook = data.data?.bookAdded;
      if (!addedBook) return;

      alert(`📚 New book "${addedBook.title}" from author ${addedBook.author.name}`);
      addBookToCache(client.cache, addedBook);
    },
  });

  return null;
};

export default BookSubscription;