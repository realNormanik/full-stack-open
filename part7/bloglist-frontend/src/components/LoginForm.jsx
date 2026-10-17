import { useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

import loginService from "../services/login";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userData = await loginService.login(username, password);
      dispatch(setUser(userData)); // Set user in Redux store
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setNotification("Logged in successfully.", "success"));
    } catch (error) {
      dispatch(setNotification(error.message, "error"));
    };
  };

  return (
    <section className="page items-center">
      <div className="card w-full max-w-md animate-rise">
        <h2>Log in to the application</h2>

        <form onSubmit={handleLogin} className="stack">
          <div className="field">
            <label htmlFor="username" className="label">Username</label>
            <input
              id="username"
              type="text"
              className="input"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
            />
          </div>

          <button type="submit" className="create mt-4 w-full">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;