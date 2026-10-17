import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlogsList from "./components/BlogsList";
import LoginForm from "./components/LoginForm";

import { setUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";

import blogService from "./services/blogs";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("user");

    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      dispatch(setUser(userData)); // Set user in Redux store
    };

    blogService
      .getAll()
      .then((fetchedBlogs) => {
        dispatch(initializeBlogs(fetchedBlogs));
      })
      .catch(() => {
        dispatch(setNotification("Error fetching blogs", "error"));
      });
  }, [dispatch]);

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <BlogsList />
      )}
    </div>
  );
};

export default App;