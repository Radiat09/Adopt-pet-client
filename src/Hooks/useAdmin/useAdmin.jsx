import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axi = useAxiosSecure();

  const { data: isAdmin = false, isPending } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const token = localStorage.getItem("access-token");
      if (token) {
        const res = await axi.get(`/users/admin/${user.email}`);
        // console.log(res.data);
        return res.data?.admin;
      }
    },
  });
  return [isAdmin, isPending];
};
export default useAdmin;
