import axios from "axios";
const path = "http://localhost:3001/api/routes";

const loggedInUser = window.localStorage.getItem("loggedInUser");
const token = loggedInUser ? `bearer ${JSON.parse(loggedInUser).token}` : null;

const services = {
  getAll: async () => {
    const res = await axios.get(path);
    return res.data;
  },
  getOne: async (id) => {
    const res = await axios.get(`${path}/${id}`);
    return res.data;
  },
  create: async (newObject) => {
    const config = {
      headers: { Authorization: token },
    };

    const res = await axios.post(path, newObject, config);
    return res.data;
  },
  remove: async (id) => {
    const res = await axios.delete(`${path}/${id}`);
    return res.data;
  },
  update: (id, newObject) => {
    const res = axios.put(`${path}/${id}`, newObject);
    return res.data;
  },
};

export default services;
