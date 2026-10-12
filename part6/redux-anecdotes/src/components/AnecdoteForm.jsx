import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAnecdote } from "../services/anecdotes";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const anecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(["anecdotes"]);
      dispatch(showNotification(`You added "${newAnecdote.content}"`, 5));
    }
  });

  const addAnecdote = (event) => {
    event.preventDefault();
    anecdoteMutation.mutate(content);
    setContent("");
  };

  return (
    <div>
      <h2>Add an anecdote</h2>

      <form onSubmit={addAnecdote}>
        <label htmlFor="content" className="hidden">story</label>
        <div className="relative">
          <input
            id="content"
            placeholder="Write something memorable…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="pr-32"
          />

          <button type="submit" className="create absolute right-2 top-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20">
              <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
            </svg>

            create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnecdoteForm;