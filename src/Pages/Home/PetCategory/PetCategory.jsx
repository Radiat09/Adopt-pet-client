import axios from "axios";
import { useEffect, useState } from "react";
import PetCard from "./PetCard";
import { FaArrowTurnDown } from "react-icons/fa6";

const PetCategory = () => {
  const [petCategory, setPetCategory] = useState([]);
  useEffect(() => {
    axios
      .get("https://adopt-pet-server.vercel.app/api/v1/categories")
      .then((res) => {
        setPetCategory(res.data);
      });
  }, []);
  return (
    <div className="max-w-7xl mx-auto my-40">
      <h2 className="text-5xl font-semibold mb-16 uppercase flex justify-center items-centerms">
        Lots of choices <FaArrowTurnDown className="text-yellow-500" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {petCategory?.map((pet) => (
          <PetCard key={pet._id} pet={pet}></PetCard>
        ))}
      </div>
    </div>
  );
};

export default PetCategory;
