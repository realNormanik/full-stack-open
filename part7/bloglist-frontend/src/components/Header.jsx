import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faUsers, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { logoutUser, setUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          dispatch(setUser(parsedUser));
        } catch (e) {
          console.error("Błąd parsowania usera z localStorage:", e);
        };
      };
    };
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user");
    dispatch(setNotification("Logout successfully.", "success"));
  };

  return (
    <header className="topbar">
      <div className="bar">
        <h2 className="logo">Blogs app</h2>

        {user && (
          <nav className="nav">
            <Link to="/" className="navlink" aria-label="Blogs">
              <FontAwesomeIcon icon={faListUl} />
            </Link>
            <Link to="/users" className="navlink" aria-label="Users">
              <FontAwesomeIcon icon={faUsers} />
            </Link>
            <span className="chip hidden sm:inline-flex">
              {user?.username ? `${user.username} is logged in` : "No user is logged in"}
            </span>
            <button onClick={handleLogout} className="danger">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />

              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;