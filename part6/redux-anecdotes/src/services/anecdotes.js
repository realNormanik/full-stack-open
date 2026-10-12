import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/anecdotes`;

export const getAnecdotes = async () => {
  const { data } = await axios.get(baseUrl);

  return data;
};

export const createAnecdote = async (content) => {
  if (content.length < 5) {
    throw new Error("Anecdote must be at least 5 characters long");
  };

  const { data } = await axios.post(baseUrl, { content, votes: 0 });

  return data;
};

export const voteForAnecdote = async (anecdote) => {
  const { data } = await axios.put(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1
  });

  return data;
};