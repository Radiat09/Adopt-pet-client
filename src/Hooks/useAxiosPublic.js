import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:9000/api/v1",
});
//http://localhost:9000/api/v1
