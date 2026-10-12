import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

// Notification Component
const Notification = ({ message, type }) => {
  const isError = type === "error";

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-md overflow-hidden rounded-md bg-foreground text-background shadow-xl"
    >
      <div className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium">
        <span className={"h-2.5 w-2.5 shrink-0 rounded-full " + (isError ? "bg-red-500" : "bg-green-500")} />
        <span>{message}</span>
      </div>

      <div className={"h-1 origin-left motion-safe:animate-shrink " + (isError ? "bg-red-500" : "bg-green-500")} />
    </div>
  );
};

// LoginForm Component
const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative flex flex-col justify-between gap-16 overflow-hidden bg-brand p-8 text-on-brand sm:p-12">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-40 h-120 w-120 rounded-full border-64 border-on-brand/10" />

        <div className="relative flex h-11 w-11 items-center justify-center rounded-md bg-on-brand font-display text-lg font-bold text-brand">
          B
        </div>

        <div className="relative">
          <h1 className="text-on-brand">Blogs worth reading.</h1>
          <p className="mt-5 max-w-sm text-base font-medium text-on-brand/70">
            Share what you read and see what others like the most.
          </p>
        </div>
      </div>

      <div className="flex items-center px-6 py-16 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="mb-10 text-2xl sm:text-2xl">Log in to the application</h2>

          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">username</label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>

            <div>
              <label htmlFor="password">password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <button type="submit" className="login">
              login
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20">
                <path d="M598.6 297.4C611.1 309.9 611.1 330.2 598.6 342.7L470.6 470.7C461.4 479.9 447.7 482.6 435.7 477.6C423.7 472.6 416 460.9 416 448L416 384L80 384C53.5 384 32 362.5 32 336L32 304C32 277.5 53.5 256 80 256L416 256L416 192C416 179.1 423.8 167.4 435.8 162.4C447.8 157.4 461.5 160.2 470.7 169.3L598.7 297.3z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ user, handleLogout }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center gap-3 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand font-display text-sm font-bold text-on-brand">
          B
        </div>

        <p className="min-w-0 flex-1 truncate text-sm"><span className="font-bold">{user.username}</span> is logged</p>

        <button onClick={handleLogout} className="logout">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20">
            <path d="M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5 384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384 464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337zM224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160z" />
          </svg>
          logout
        </button>
      </div>
    </header>
  );
};

// Blogs Component
const Blogs = ({ blogs, user, handleLike, handleDelete }) => {
  if (blogs.length === 0) {
    return (
      <div className="u1 px-6 py-14 text-center fill-brand">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="45" height="45" className="mb-3">
          <path d="M192 64C156.7 64 128 92.7 128 128L128 544C128 555.5 134.2 566.2 144.2 571.8C154.2 577.4 166.5 577.3 176.4 571.4L320 485.3L463.5 571.4C473.4 577.3 485.7 577.5 495.7 571.8C505.7 566.1 512 555.5 512 544L512 128C512 92.7 483.3 64 448 64L192 64z" />
        </svg>
        <p className="text-sm font-semibold">No blogs yet</p>
        <p className="mt-1 text-sm text-muted">Add the first blog to start the list.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-line">
      {blogs.map(blog => (
        <div key={blog._id} className="border-l-4 border-transparent px-4 py-4 transition hover:border-brand hover:bg-soft">
          <Blog blog={blog} onLike={handleLike} onDelete={handleDelete} user={user} />
        </div>
      ))}
    </div>
  );
};

// App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("user");

    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    };

    blogService
      .getAll()
      .then(fetchedBlogs => setBlogs(fetchedBlogs))
      .catch(() => {
        setNotification({ message: "Error fetching blogs", type: "error" });
        setTimeout(() => setNotification(null), 5000);
      });
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userData = await loginService.login(username, password);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setNotification({ message: "Logged in successfully.", type: "success" });
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    };

    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setNotification({ message: "Logout successfully.", type: "success" });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddBlog = async (newBlog) => {
    const blogData = { title: newBlog.title, author: newBlog.author, url: newBlog.url };

    try {
      const addedBlog = await blogService.addBlog(blogData, user.token);
      setBlogs(blogs.concat(addedBlog));
      setNotification({ message: "Blog added successfully.", type: "success" });
    } catch (error) {
      setNotification({ message: "Error adding a blog.", type: "error" });
    };

    setTimeout(() => setNotification(null), 5000);
  };

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1 // Increment the likes
    };

    try {
      const returnedBlog = await blogService.likeBlog(blog._id, updatedBlog, user.token);
      setBlogs(blogs.map(b => (b._id === returnedBlog._id ? returnedBlog : b)));
      setNotification({ message: "Blog liked successfully.", type: "success" });
    } catch (error) {
      setNotification({ message: "Error liking the blog.", type: "error" });
    };

    setTimeout(() => setNotification(null), 5000);
  };

  const handleDelete = async (blog) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${blog.title}"?`);

    if (confirmDelete) {
      try {
        await blogService.deleteBlog(blog._id, user.token);
        setBlogs(blogs.filter(b => b._id !== blog._id));
        setNotification({ message: "Blog deleted successfully.", type: "success" });
      } catch (error) {
        setNotification({ message: "Error deleting the blog.", type: "error" });
      }

      setTimeout(() => setNotification(null), 5000);
    };
  };

  // Sort a copy so the state array is never mutated
  const sortedBlogs = Array.isArray(blogs) ? [...blogs].sort((a, b) => b.likes - a.likes) : [];

  return (
    <div className="min-h-screen">
      {notification && <Notification message={notification.message} type={notification.type} />}

      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
        />
      ) : (
        <>
          <Header user={user} handleLogout={handleLogout} />

          <main className="mx-auto w-full max-w-3xl space-y-10 px-4 py-12">
            <div>
              <h2 className="capitalize">blogs</h2>
              <p className="mt-3 text-sm text-muted">{sortedBlogs.length} in the list, most liked first.</p>
            </div>

            <section className="p-5">
              <h3 className="mb-4">add new blog</h3>

              <Togglable>
                <BlogForm onAddBlog={handleAddBlog} />
              </Togglable>
            </section>

            <section className="overflow-hidden">
              <Blogs blogs={sortedBlogs} user={user} handleLike={handleLike} handleDelete={handleDelete} />
            </section>

            {/* Footer */}
            <p className="py-3 mb-0 text-center text-sm text-muted">
              Built with React & Tailwind CSS
            </p>

            {/* GitHub */}
            <aside className="github">
              <div className="z-2 fixed w-50 h-50 right-0 bottom-0 overflow-hidden after:content-[''] after:block after:absolute after:left-0 after:right-0 after:bottom-0 after:z-0 after:border-t-[12.5rem] after:border-t-transparent after:border-l-[12.5rem] after:border-l-transparent after:border-b-[12.5rem] after:border-b-[#343535]">
                <div className="u1 z-1 w-full h-full top-0 right-0 absolute justify-end -rotate-45">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    aria-label="github-repo"
                    href="https://github.com/realNormanik/full-stack-open/tree/main/part5/bloglist-frontend"
                    className="u1 focus:text-g-100 hover:text-[#a6a6a6] text-white text-base font-mono no-underline px-6 pt-[.1875rem] pb-6 m-0 -mb-5 transition-colors duration-[150ms] ease-[cubic-bezier(1,-.115,.975,.855)]"
                  >
                    <p className="text-current font-normal text-base mt-4 mb-4">
                      View on GitHub
                    </p>

                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" aria-hidden="true" width="35" height="35">
                      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2.3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </aside>
          </main>
        </>
      )}
    </div>
  );
};

export default App;