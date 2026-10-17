import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/api/blogs`;

// Fetch blog by ID
const getBlog = async (postId) => {
  const response = await axios.get(`${baseUrl}/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : ""}`
    }
  });

  return response.data;
};

// Fetch all blogs
const getAll = () => {
  const request = axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : ""}`
    }
  });

  return request.then((response) => response.data);
};

// Add new blog
const addBlog = (newBlog, token) => {
  const request = axios.post(baseUrl, newBlog, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return request.then((response) => response.data);
};

// Like blog
const likeBlog = (blogId, updatedBlog, token) => {
  const request = axios.put(`${baseUrl}/${blogId}`, updatedBlog, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return request.then((response) => response.data);
};

// Delete blog
const deleteBlog = (blogId, token) => {
  const request = axios.delete(`${baseUrl}/${blogId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return request.then((response) => response.data);
};

// Add comment blog
const addComment = (blogId, newComment, token) => {
  const request = axios.post(`${baseUrl}/${blogId}/comments`, newComment, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return request.then((response) => response.data);
};

export default { getBlog, getAll, addBlog, likeBlog, deleteBlog, addComment };