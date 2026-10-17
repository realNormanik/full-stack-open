import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import Loading from "./Loading";
import CommentForm from "./CommentForm";

import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";
import { fetchBlog, addNewComment } from "../reducers/blogReducer";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const blog = useSelector((state) => state.blogs.singleBlog);
  const [likes, setLikes] = useState(blog ? blog.likes : 0);

  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  useEffect(() => {
    dispatch(fetchBlog(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (blog) {
      setLikes(blog.likes);
    };
  }, [blog]);

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1
    };
  
    try {
      const returnedBlog = await blogService.likeBlog(blog._id, updatedBlog, user.token);
      setLikes(returnedBlog.likes);
      dispatch(setNotification("Blog liked successfully.", "success"));
    } catch (error) {
      dispatch(setNotification("Error liking the blog.", "error"));
    };
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${blog.title}"?`);

    if (confirmDelete) {
      try {
        await blogService.deleteBlog(blog._id, user.token);
        dispatch(setNotification("Blog deleted successfully.", "success"));
        navigate("/");
      } catch (error) {
        dispatch(setNotification("Error deleting the blog.", "error"));
      };
    };
  };

  const handleAddComment = async (id, newComment) => {
    const commentData = {
      content: newComment
    };
  
    if (!user || !user.token) {
      dispatch(setNotification("User not authenticated", "error"));
      return;
    };
  
    try {
      dispatch(addNewComment(id, commentData));
    } catch (error) {
      dispatch(setNotification("Error adding a comment.", "error"));
    };
  };
  

  if (!blog) {
    return <Loading />;
  };

  return (
    <section className="page">
      <div className="bento">
        <article className="card-ink md:col-span-6">
          <div className="stack">
            <h1 className="headline">{blog.title}</h1>

            <a href={blog.url} className="link-ink" target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={handleLike} className="vote" aria-label="Like this blog">
              <FontAwesomeIcon icon={faThumbsUp} />
              {likes}
            </button>

            <p className="text-sm font-medium text-white/70">
              Added by{" "}
              <Link to={`/users/${blog.user._id}`} className="link-ink">
                {blog.user.username}
              </Link>
            </p>

            {user && user.username === blog.user.username && (
              <button onClick={handleDelete} className="danger ml-auto" aria-label="Delete this blog">
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            )}
          </div>
        </article>

        <div className="card md:col-span-6">
          <h2>Comments</h2>

          <CommentForm id={id} onAddComment={handleAddComment} />

          {blog.comments && blog.comments.length > 0 ? (
            <ul className="stack">
              {blog.comments.map(comment => (
                <li key={comment._id} className="row">
                  <p className="font-medium">{comment.content}</p>
                  <small className="label">{new Date(comment.createdAt).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">No comments yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;