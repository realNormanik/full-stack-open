import { useQuery, useMutation } from "@apollo/client/react";

import AuthorForm from "./AuthorForm";

import { ALL_AUTHORS } from "./queries";
import { EDIT_AUTHOR } from "./mutations";

const Authors = ({ user }) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (err) => console.error(err.message),
  });

  if (loading) {
    return (
      <p className="notice" role="status">
        <span className="spinner" />
        loading...
      </p>
    );
  };

  if (error) {
    return (
      <p className="notice text-danger" role="alert">
        Error: {error.message}
      </p>
    );
  };

  const authors = data.allAuthors;

  const submit = async (name, born) => {
    await editAuthor({ variables: { name, setBornTo: born } });
  };

  return (
    <div className="bento">
      <section className="card-ink md:col-span-4">
        <h2 className="headline">Authors</h2>

        <p className="max-w-md text-base leading-relaxed text-white/70">
          Everyone behind the books on the shelves, with birth year and book count.
        </p>
      </section>

      <section className="card-brand md:col-span-2">
        <p className="text-sm font-medium opacity-80">Total authors</p>
        <p className="value">{authors.length}</p>
      </section>

      <section className={`card ${user ? "md:col-span-4" : "md:col-span-6"}`}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Born</th>
              <th>Books</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td className="text-muted">{a.born || "N/A"}</td>
                <td><span className="chip">{a.bookCount}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {user && (
        <div className="self-start md:col-span-2">
          <AuthorForm authors={authors} onSubmit={submit} />
        </div>
      )}
    </div>
  );
};

export default Authors;