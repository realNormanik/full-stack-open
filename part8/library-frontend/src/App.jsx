import { useState, useEffect } from "react";

import Books from "./components/Books";
import Authors from "./components/Authors";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import BookSubscription from "./components/BookSubscription";

const App = () => {
  const [page, setPage] = useState("authors");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {user ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      {page === "books" && <Books />}
      {page === "authors" && <Authors />}
      {page === "add" && user && <NewBook />}
      {page === "recommend" && user && <Recommendations />}
      {page === "login" && !user && <LoginForm setUser={setUser} setPage={setPage} />}

      <BookSubscription />
    </div>
  );
};

export default App;