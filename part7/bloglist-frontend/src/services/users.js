import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/api/users`;

const getUser = async (id, token) => {
  const response = await axios.get(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

const getAllUsers = async (token) => {
  const response = await axios.get(baseUrl, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

export default { getUser, getAllUsers };