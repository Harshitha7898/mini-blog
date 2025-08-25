import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use(req => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getPostsWithParams = (page = 1, limit = 5, search = "") =>
  API.get(`/posts?page=${page}&limit=${limit}&search=${search}`);
export const createPost = (data) => API.post("/posts", data);
