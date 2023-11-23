import AuImg from "../../../assets/images/dog-P228UWM.jpg";
import { AiOutlineLine } from "react-icons/ai";
import { FaBone } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-5 my-40">
      <div className="flex-1 mx-auto">
        <img src={AuImg} alt="image of two dogs" />
      </div>
      <div className="flex-1 flex flex-col justify-center gap-8 mx-auto">
        <h5 className="flex items-center text-yellow-400">
          <AiOutlineLine className="text-6xl"></AiOutlineLine>{" "}
          <span className="text-xl font-medium">About us</span>
        </h5>
        <h2 className="text-5xl font-bold">The Best for Your Pet!</h2>
        <p className="font-mono text-gray-500">
          For every animal saved, countless others are still suffering. Create a
          future where animals no longer have to suffer in puppy mills, testing
          labs or other heartbreaking situations
        </p>
        <div className="space-y-3">
          <p className=" flex items-center gap-4 text-gray-500">
            <FaBone className="text-red-600 text-2xl"></FaBone> Lorem ipsum
            dolor sit amet, consectetur
          </p>
          <p className=" flex items-center gap-4 text-gray-500">
            <FaBone className="text-red-600 text-2xl"></FaBone> Lorem ipsum No
            delenit detracto eum, vix ne integre taci
          </p>
          <p className=" flex items-center gap-4 text-gray-500">
            <FaBone className="text-red-600 text-2xl"></FaBone> Lorem ipsum An
            pro facete dicuntei ut epicuri
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
