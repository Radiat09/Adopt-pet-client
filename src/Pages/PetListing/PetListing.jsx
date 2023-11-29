import { useQuery } from "@tanstack/react-query";
import boneBg from "../../assets/images/bone-bg.jpg";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Card from "../../components/Card";
import { useState } from "react";

const PetListing = () => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const axiosPublic = useAxiosPublic();
  const { data: pets = [], refetch } = useQuery({
    queryKey: ["Pets"],
    queryFn: async () => {
      // if (searchText || category) {
      const res = await axiosPublic.get(
        `/pets?query1=${searchText}&query2=${category}`
      );
      return res.data;
      // }
    },
  });

  const handleSearchBtn = (e) => {
    e.preventDefault();
    const searchTxt = e.target.search.value;
    const newTxt = searchTxt.charAt(0).toUpperCase() + searchTxt.slice(1);
    setSearchText(newTxt);
    // const categorySearch = e.target.categorySearch.value;
    let cate;
    if (e.target.categorySearch.value === "default") {
      cate = "";
    } else {
      cate = e.target.categorySearch.value;
    }
    setCategory(cate);
    refetch();
  };
  // console.log(searchText);
  return (
    <div className="mb-20">
      <div
        className="hero min-h-[50vh]"
        style={{
          backgroundImage: `url(${boneBg})`,
        }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md text-white">
            <h1 className="mb-5 text-5xl font-bold text-blue-300">
              Find The Perfect Pet For You!
            </h1>
            <p className="mb-5 font-bold">
              Browse pets from our network of over 11,500 shelters and rescues.
            </p>
            <form onSubmit={handleSearchBtn}>
              <div className="join">
                <div>
                  <input
                    name="search"
                    className="input input-bordered join-item focus:outline-none text-yellow-600 capitalize"
                    placeholder="Search"
                  />
                </div>
                <select
                  name="categorySearch"
                  defaultValue={"default"}
                  className="select select-bordered join-item focus:outline-none text-yellow-600"
                >
                  <option disabled value={"default"}>
                    Filter
                  </option>
                  <option>dogs</option>
                  <option>cats</option>
                  <option>fish</option>
                  <option>birds</option>
                  <option>small_mammals</option>
                  <option>reptiles</option>
                </select>
                <div className="">
                  <button
                    type="submit"
                    className="btn btn-info join-item text-white"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <p className="text-center text-red-500 font-bold">
        Please hit search button twice to search
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20 max-w-7xl mx-auto">
        {pets.map((pet) => (
          <Card key={pet._id} pet={pet}></Card>
        ))}
      </div>
    </div>
  );
};

export default PetListing;
