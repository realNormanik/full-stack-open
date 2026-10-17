import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loading from "./Loading";

import { fetchUsers } from "../reducers/usersReducer";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.allUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (!users) {
    return <Loading />;
  };

  return (
    <section className="page">
      <div className="card animate-rise">
        <h2>Users</h2>

        <div className="stack">
          <div className="flex justify-between px-5">
            <p className="label">Name</p>
            <p className="label">Blogs created</p>
          </div>

          {users.map((user) => (
            <article key={user.id} className="row px-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="avatar" aria-hidden="true">
                  {user.username?.charAt(0).toUpperCase()}
                </span>
                <Link to={`/users/${user.id}`} className="link-title">
                  {user.username}
                </Link>
              </div>
              <span className="chip">{user.posts.length}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsersList;