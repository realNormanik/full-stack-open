import React, { useState } from "react";
import PropTypes from "prop-types";

const CommentForm = ({ id, onAddComment }) => {
  const [newBlogComment, setNewBlogComment] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    onAddComment( id, newBlogComment );
    setNewBlogComment("");
  };

  return(
    <form className="card-soft" onSubmit={handleSubmit}>
      <h3>Add a comment</h3>

      <div className="field">
        <label htmlFor="blog-comment" className="label">Comment</label>
        <input
          id="blog-comment"
          className="input"
          type="text"
          value={newBlogComment}
          onChange={({ target }) => setNewBlogComment(target.value)}
          required
        />
      </div>

      <button type="submit" className="create self-start">
        Create
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired
};

export default CommentForm;