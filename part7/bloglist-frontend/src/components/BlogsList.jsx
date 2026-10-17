import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./Blog";
import Loading from "./Loading";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

import { setUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { initializeBlogs, addNewBlog } from "../reducers/blogReducer";

const BlogsList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.allBlogs);  // Accessing allBlogs from the Redux store
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("user");

    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      dispatch(setUser(userData)); // Set user in Redux store
    };

    dispatch(initializeBlogs()); // Fetch and initialize blogs from the Redux store
  }, [dispatch]);

  const handleAddBlog = async (newBlog) => {
    const blogData = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };

    if (!user || !user.token) {
      dispatch(setNotification("User not authenticated", "error"));
      return;
    };

    try {
      dispatch(addNewBlog(blogData)); // Dispatch the action to add a new blog
      dispatch(setNotification("Blog added successfully.", "success"));
    } catch (error) {
      dispatch(setNotification("Error adding a blog.", "error"));
    };
  };

  if (!blogs) {
    return <Loading />;
  };

  return (
    <section className="page">
      <div className="bento items-start">
        <div className="card-soft md:col-span-2">
          <h2>Add new blog</h2>

          <Togglable>
            <BlogForm onAddBlog={handleAddBlog} />
          </Togglable>
        </div>

        <div className="card md:col-span-4">
          <h2>All blogs</h2>

          <div className="stack">
            {Array.isArray(blogs) && blogs.length === 0 && (
              <p className="empty">No blogs yet.</p>
            )}

            {Array.isArray(blogs) &&
              blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <Blog
                    key={blog._id}
                    blog={blog}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsList;