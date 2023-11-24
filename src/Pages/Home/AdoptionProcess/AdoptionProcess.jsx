import { AiOutlineLine } from "react-icons/ai";
import hww1 from "../../../assets/images/HWW1.jpg";
import hww2 from "../../../assets/images/HWW2.jpg";
import hww3 from "../../../assets/images/HWW3.jpg";

const AdoptionProcess = () => {
  return (
    <div className="max-w-7xl mx-auto my-40">
      <div className="text-center mb-16">
        <h5 className="flex items-center justify-center text-yellow-400">
          <AiOutlineLine className="text-6xl"></AiOutlineLine>{" "}
          <span className="text-xl font-medium">How We Work</span>
        </h5>
        <h2 className="text-5xl font-bold">Pet Adoption Process</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col gap-8">
          <div className="relative flex justify-center">
            <img
              src={hww1}
              className="w-1/2 rounded-full border-[12px] border-yellow-500"
              alt="an image of a person petting a dog"
            />
            <h5 className="text-2xl font-black text-yellow-400 bg-white py-1 px-3 border rounded-full  absolute top-0 right-32">
              1
            </h5>
          </div>
          <div className="space-y-5 text-center ">
            <h4 className="text-4xl font-bold">Find Your Pet</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="relative flex justify-center">
            <img
              src={hww2}
              className="w-1/2 rounded-full border-[12px] border-yellow-500"
              alt="an image of a person petting a dog"
            />
            <h5 className="text-2xl font-black text-yellow-400 bg-white py-1 px-3 border rounded-full  absolute top-0 right-32">
              2
            </h5>
          </div>
          <div className="space-y-5 text-center ">
            <h4 className="text-4xl font-bold">Know your pet</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="relative flex justify-center">
            <img
              src={hww3}
              className="w-1/2 rounded-full border-[12px] border-yellow-500"
              alt="an image of a person petting a dog"
            />
            <h5 className="text-2xl font-black text-yellow-400 bg-white py-1 px-3 border rounded-full  absolute top-0 right-32">
              3
            </h5>
          </div>
          <div className="space-y-5 text-center ">
            <h4 className="text-4xl font-bold">Take your pet home</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionProcess;
