import { useQuery } from "@tanstack/react-query";
import boneBg from "../../assets/images/bone-bg.jpg";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Card from "../../components/Card";

const PetListing = () => {
  const axiosPublic = useAxiosPublic();
  const { data: pets = [] } = useQuery({
    queryKey: ["Pets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pets");
      return res.data;
    },
  });

  const handleSearchBtn = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    console.log(searchText);
  };
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
                    className="input input-bordered join-item focus:outline-none text-black"
                    placeholder="Search"
                  />
                </div>

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20 max-w-7xl mx-auto">
        {pets.map((pet) => (
          <Card key={pet._id} pet={pet}></Card>
        ))}
      </div>
    </div>
  );
};

export default PetListing;
