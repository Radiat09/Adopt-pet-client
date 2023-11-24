import { AiOutlineLine } from "react-icons/ai";
import dia from "../../../assets/images/diagram.png";

const OurServices = () => {
  return (
    <div className="max-w-7xl mx-auto my-40">
      <div className="text-center">
        <h5 className="flex items-center justify-center text-yellow-400">
          <AiOutlineLine className="text-6xl"></AiOutlineLine>{" "}
          <span className="text-xl font-medium">Our Services</span>
        </h5>
        <h1 className="mb-5 text-5xl font-bold text-blue-500">
          Taking Care Of Pets
        </h1>
        <img className="mx-auto" src={dia} alt="" />
      </div>
    </div>
  );
};

export default OurServices;
