import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getAnecdotes, voteForAnecdote } from "../services/anecdotes";

import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const filter = useSelector((state) => state.filter);

  const { data: anecdotes = [], error, isLoading } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const voteMutation = useMutation({
    mutationFn: voteForAnecdote,

    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({
        queryKey: ["anecdotes"],
      });

      dispatch(
        showNotification(
          `You voted for "${updatedAnecdote.content}"`,
          5
        )
      );
    },
  });

  if (isLoading) {
    return (
      <div className="u1 rounded-4xl border border-dashed border-line px-6 py-16 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="45" height="45" className="fill-brand mb-4">
          <path d="M128 96C128 78.3 142.3 64 160 64L480 64C497.7 64 512 78.3 512 96C512 113.7 497.7 128 480 128L480 139C480 181.4 463.1 222.1 433.1 252.1L365.2 320L433.1 387.9C463.1 417.9 480 458.6 480 501L480 512C497.7 512 512 526.3 512 544C512 561.7 497.7 576 480 576L160 576C142.3 576 128 561.7 128 544C128 526.3 142.3 512 160 512L160 501C160 458.6 176.9 417.9 206.9 387.9L274.8 320L206.9 252.1C176.9 222.1 160 181.4 160 139L160 128C142.3 128 128 113.7 128 96zM224 128L224 139C224 164.5 234.1 188.9 252.1 206.9L320 274.8L387.9 206.9C405.9 188.9 416 164.5 416 139L416 128L224 128zM224 512L416 512L416 501C416 475.5 405.9 451.1 387.9 433.1L320 365.2L252.1 433.1C234.1 451.1 224 475.5 224 501L224 512z" />
        </svg>

        <p className="text-sm font-bold motion-safe:animate-pulse">
          Loading anecdotes...
        </p>
      </div>
    );
  };

  if (error) {
    return (
      <div className="flex items-center rounded-4xl border border-red-500/30 bg-red-500/10 px-6 py-8 text-sm font-semibold text-red-600/70 dark:text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="25" height="25" className="mr-1 fill-red-600/70 dark:fill-red-400">
          <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z" />
        </svg>

        Service not available due to server problems.
      </div>
    );
  };

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content
      .toLowerCase()
      .includes(filter.trim().toLowerCase())
  );

  if (filteredAnecdotes.length === 0) {
    return (
      <div className="u1 rounded-4xl border border-dashed border-line px-6 py-16 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="45" height="45" className="fill-brand mb-4">
          <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
        </svg>

        <p className="text-sm font-bold">
          No matching anecdotes found
        </p>
        <p className="mt-1 text-sm text-muted">
          Try a different search phrase.
        </p>
      </div>
    );
  };

  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes);

  const totalVotes = filteredAnecdotes.reduce((sum, anecdote) => sum + anecdote.votes, 0);

  return (
    <div className="grid gap-4 md:grid-cols-6">
      <div className="card md:col-span-3">
        <p className="text-sm font-bold text-muted">stories</p>
        <p className="mt-2 font-display text-6xl font-black leading-none tabular-nums">
          {filteredAnecdotes.length}
        </p>
      </div>

      <div className="card-soft md:col-span-3">
        <p className="text-sm font-bold">votes</p>
        <p className="mt-2 font-display text-6xl font-black leading-none tabular-nums">
          {totalVotes}
        </p>
      </div>

      {sortedAnecdotes.map((anecdote, index) => {
        const isTop = index === 0;

        const size = isTop ? "md:col-span-4" : index === 1 ? "md:col-span-2" : "md:col-span-3";

        return (
          <div
            key={anecdote.id}
            className={(isTop ? "card-ink " : "card ") + size}
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-sm font-bold tabular-nums opacity-60">
                  #{index + 1}
                </span>

                {isTop && anecdote.votes > 0 && (
                  <span className="chip">Most voted</span>
                )}
              </div>

              <div className={"mt-4 font-semibold leading-snug " + (isTop ? "text-xl" : "text-base")}>
                {anecdote.content}
              </div>
            </div>

            <div className={"mt-8 flex items-center justify-between gap-3 border-t pt-4 font-display text-xl font-bold " + (isTop ? "border-background/20" : "border-line")}>
              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20" className={isTop ? "fill-panel" : "fill-foreground"}>
                  <path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z" />
                </svg>

                {anecdote.votes}
              </div>

              <button
                className="vote"
                onClick={() => voteMutation.mutate(anecdote)}
                disabled={voteMutation.isPending}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20">
                  <path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z" />
                </svg>

                {voteMutation.isPending ? "Voting..." : "vote"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnecdoteList;