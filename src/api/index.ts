import axios from "axios";
import { getToken } from "@/utils";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ` + getToken();
  return config;
});

export { api };
