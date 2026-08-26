import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN } from "./mutations";

const LoginForm = ({ setUser, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.error(error.graphQLErrors[0]?.message);
    }
  });

  const handleLogin = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.token;
      const loggedInUser = { username, token };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUsername("");
      setPassword("");
      setLoginSuccess(true);
      setPage("books");
    };
  }, [result.data, username, password, setUser]);

  return (
    <form onSubmit={handleLogin}>
      <h2>Log in</h2>
      <div>
        username
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>

      {loginSuccess && <p>Login successful!</p>}
    </form>
  );
};

export default LoginForm;