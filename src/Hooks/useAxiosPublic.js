import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://adopt-pet-server.vercel.app/api/v1",
});
//http://localhost:9000/api/v1

const useAxiosPublic = () => {
  return axiosPublic;
};
export default useAxiosPublic;
