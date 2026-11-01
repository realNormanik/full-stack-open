import { useState } from "react";
import { useMutation } from "@apollo/client/react";

import { LOGIN } from "./mutations";

const LoginForm = ({ setUser, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const [login, { loading }] = useMutation(LOGIN);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const { data } = await login({ variables: { username, password } });

      const loggedInUser = { username, token: data.login.token };
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setUsername("");
      setPassword("");
      setPage("books");
    } catch (error) {
      setErrorMessage(error.message);
    };
  };

  return (
    <div className="mx-auto w-full max-w-md animate-rise">
      <form onSubmit={handleLogin} className="card">
        <h2>Log in</h2>

        <div className="field">
          <label htmlFor="username" className="label">Username</label>
          <input
            id="username"
            className="input"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="password" className="label">Password</label>
          <input
            id="password"
            className="input"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit" className="create w-full" disabled={loading}>login</button>

        {errorMessage && (
          <p className="notice text-danger" role="alert">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;