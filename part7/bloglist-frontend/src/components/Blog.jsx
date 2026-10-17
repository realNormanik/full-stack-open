import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Blog = ({ blog }) => {
  return (
    <article className="row">
      <div className="flex min-w-0 flex-col gap-0.5">
        <Link to={`/blogs/${blog._id}`} className="link-title">
          {blog.title}
        </Link>
        {blog.author && <p className="label">{blog.author}</p>}
      </div>

      {typeof blog.likes === "number" && (
        <span className="chip">{blog.likes} likes</span>
      )}
    </article>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    likes: PropTypes.number
  }).isRequired
};

export default Blog;