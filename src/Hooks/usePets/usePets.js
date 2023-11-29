import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic";

const usePets = (searchText, category, email) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: pets = [],
    isLoading,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["Pets"],
    queryFn: async () => {
      // if (searchText || category) {
      const res = await axiosPublic.get(
        `/pets?query1=${searchText}&query2=${category}&query3=${email}`
      );
      return res.data;
      // }
    },
  });

  return [pets, refetch, isLoading, isFetched];
};

export default usePets;
