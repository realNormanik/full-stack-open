
import { useState, useEffect } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };

    fetchResources();
  }, [baseUrl]);

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);

    setResources((prevResources) =>
      prevResources.concat(response.data)
    );
  };

  const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`);

    setResources((prevResources) =>
      prevResources.filter((resource) => resource.id !== id)
    );
  };

  return [resources, { create, remove }];
};

export default useResource;