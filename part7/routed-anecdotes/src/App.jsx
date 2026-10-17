import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Anecdote from "./components/Anecdote";
import AnecdoteList from "./components/AnecdoteList";
import CreateAnecdote from "./components/CreateAnecdote";

export default function App() {
  const [successMessage, setSuccessMessage] = useState("");
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2
    }
  ]);

  const newAnecdote = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  return (
    <div className="shell">
      <Menu />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} successMessage={successMessage} />} />
          <Route path="/create" element={<CreateAnecdote newAnecdote={newAnecdote} setSuccessMessage={setSuccessMessage} />} />
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};