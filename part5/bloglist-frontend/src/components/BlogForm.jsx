import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ onAddBlog }) => {
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddBlog({ title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl });
    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="blog-title">Title</label>
        <input
          id="blog-title"
          className="blog-title-input"
          type="text"
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="blog-author">Author</label>
        <input
          id="blog-author"
          className="blog-author-input"
          type="text"
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="blog-url">URL</label>
        <input
          id="blog-url"
          className="blog-url-input"
          type="text"
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button className="create-button login" type="submit">
        create
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18" strokeWidth="56" strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-current">
          <path d="M320 128L320 512M128 320L512 320" />
        </svg>
      </button>
    </form>
  );
};

BlogForm.propTypes = {
  onAddBlog: PropTypes.func.isRequired
};

export default BlogForm;