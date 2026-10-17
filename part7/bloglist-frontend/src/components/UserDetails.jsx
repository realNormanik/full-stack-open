import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loading from "./Loading";

import blogService from "../services/blogs";
import { fetchUser } from "../reducers/usersReducer";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.users.singleUser);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user && user.posts.length > 0) {
      setLoading(true);
      setError(null);
      const fetchBlogs = async () => {
        try {
          const blogTitles = await Promise.all(
            user.posts.map(postId => blogService.getBlog(postId))
          );
          setBlogs(blogTitles);
        } catch (err) {
          setError("Failed to fetch blog titles");
        } finally {
          setLoading(false);
        };
      };
      fetchBlogs();
    };
  }, [dispatch, user]);

  if (!user || loading) {
    return <Loading />;
  };

  return (
    <section className="page">
      <div className="bento">
        <article className="card-ink md:col-span-4">
          <p className="text-sm font-medium opacity-70">User details</p>
          <div className="stack">
            <h1 className="headline">{user.name}</h1>
            <p className="text-base font-medium text-white/70">@{user.username}</p>
          </div>
        </article>

        <article className="card-brand md:col-span-2">
          <p className="text-sm font-medium opacity-80">Blogs created</p>
          <p className="value">{user.created}</p>
        </article>

        <div className="card md:col-span-6">
          <h2>Blogs</h2>

          {error && <p className="text-sm font-semibold text-danger">Error: {error}</p>}

          {blogs.length > 0 ? (
            <ul className="stack">
              {blogs.map((blog) => (
                <li key={blog._id} className="row">
                  <Link to={`/blogs/${blog._id}`} className="link-title">
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">No blogs available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserDetails;