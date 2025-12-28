import axios from "axios";

const emailApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BACKEND_URL}/user`
});

export default emailApi;
