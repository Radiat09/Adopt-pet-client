import bannerImg from "../../../assets/images/banner-img.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div>
      <div className="hero min-h-[90vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1 w-full">
            <img src={bannerImg} className="w-full shadow-2xl" />
          </div>
          <div className="flex-1 space-y-10">
            <h1 className="text-6xl font-bold">
              Ready to <span className="text-yellow-600 underline">Adopt!</span>
            </h1>
            <p className="font-medium text-lg text-gray-600">
              So you&apos;ve decided to add a new pet to your family. First, you
              should answer some questions: What kind of pet will be the best
              fit for your household? Do you have enough time to devote to the
              daily needs of a Pet?
            </p>
            <button className="btn btn-info rounded-3xl text-white text-lg hover:underline">
              View Puppies <FaLongArrowAltRight></FaLongArrowAltRight>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
