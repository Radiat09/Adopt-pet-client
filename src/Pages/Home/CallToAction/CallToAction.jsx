import { FaLongArrowAltRight } from "react-icons/fa";
import ctaImg from "../../../assets/images/Cta-Img.jpg";

const CallToAction = () => {
  return (
    <div
      className="hero min-h-[50vh] my-20 "
      style={{
        backgroundImage: `url(${ctaImg})`,
      }}
    >
      <div className="hero-overlay bg-opacity-30"></div>
      <div className="max-w-6xl w-full flex justify-start text-white p-6">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Want a pet for your loved ones?
          </h1>
          <p className="mb-5">
            Elit sanctus mea no. Ne duo vocent vocibus consetetur. Singulis etam
            pericula an vis, pri graeco partiendo te, alii admodum copiosae id
            sea. Per no malis liber fierent.
          </p>
          <button className="btn btn-info rounded-3xl text-white text-lg hover:underline">
            Apply Today <FaLongArrowAltRight></FaLongArrowAltRight>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
