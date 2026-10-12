import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/api/persons`;

// Function to fetch all persons
const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

// Function to add a new person
const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
};

// Function to delete a person by ID
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

// Function to update a person's information
const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data);
};

// Export the functions
export default { getAll, create, remove, update };