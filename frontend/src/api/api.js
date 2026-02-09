import axios from "axios";

const api = axios.create({
  baseURL: "https://safeheal-backend.onrender.com/api", 
});

export default api;