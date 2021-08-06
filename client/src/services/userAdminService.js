import axios from "axios";
const loginPath = "http://localhost:3001/api/login";
const signupPath = "http://localhost:3001/api/users";

const services = {
  login: async (credentials) => {
    const res = await axios.post(loginPath, credentials);
    return res.data;
  },
  signup: async (credentials) => {
    const res = await axios.post(signupPath, credentials);
    return res.data;
  },
  load: async (username) => {
    const res = await axios.get(`${signupPath}/${username}`);
    return res.data;
  },
};

export default services;
