import React, { useState } from "react";
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
    <form className="stack" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="blog-title" className="label">Title</label>
        <input
          id="blog-title"
          className="input"
          type="text"
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="blog-author" className="label">Author</label>
        <input
          id="blog-author"
          className="input"
          type="text"
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="blog-url" className="label">URL</label>
        <input
          id="blog-url"
          className="input"
          type="url"
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
          required
        />
      </div>

      <button type="submit" className="create">
        Create
      </button>
    </form>
  );
};

BlogForm.propTypes = {
  onAddBlog: PropTypes.func.isRequired,
};

export default BlogForm;