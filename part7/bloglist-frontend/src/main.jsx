import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import App from "./App";
import store from "./store";
import Header from "./components/Header";
import UsersList from "./components/UsersList";
import UserDetails from "./components/UserDetails";
import BlogDetails from "./components/BlogDetails";
import Notification from "./components/Notification";

const Main = () => {
  return (
    <main>
      <Header />
      <Notification />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>
);