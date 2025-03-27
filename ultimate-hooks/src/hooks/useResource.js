import { useState, useEffect } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  let token = null;

  const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(baseUrl);
        setResources(response.data);
      } catch (error) {
        console.error("Fetching resources failed:", error);
      }
    };
    fetchResources();
  }, [baseUrl]);

  const create = async (resource) => {
    try {
      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.post(baseUrl, resource, config);
      setResources((prevResources) => [...prevResources, response.data]);
    } catch (error) {
      console.error("Creating resource failed:", error);
    }
  };

  return [resources, { create, setToken }];
};

export default useResource;
