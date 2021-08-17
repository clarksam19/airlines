import axios from "axios";
const loginPath = "/api/login";
const signupPath = "/api/users";

const services = {
  login: async (credentials) => {
    const res = await axios.post(loginPath, credentials);
    return res.data;
  },
  logout: () => {
    return window.localStorage.removeItem("loggedInUser");
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
