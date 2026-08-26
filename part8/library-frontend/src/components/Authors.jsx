import { useQuery, useMutation } from "@apollo/client";

import AuthorForm from "./AuthorForm";

import { ALL_AUTHORS } from "./queries";
import { EDIT_AUTHOR } from "./mutations";

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (result.loading) return <div>loading...</div>;

  const authors = result.data.allAuthors;

  const submit = async (name, born) => {
    const user = JSON.parse(localStorage.getItem("user"));

    await editAuthor({
      variables: { name, setBornTo: born },
      context: {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    });
  };

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born || "N/A"}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm onSubmit={submit} />
    </div>
  );
};

export default Authors;