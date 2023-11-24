import AboutUs from "../AboutUs/AboutUs";
import AdoptionProcess from "../AdoptionProcess/AdoptionProcess";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import OurServices from "../OurServices/OurServices";
import PetCategory from "../PetCategory/PetCategory";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PetCategory></PetCategory>
      <AboutUs></AboutUs>
      <CallToAction></CallToAction>
      <AdoptionProcess></AdoptionProcess>
      <OurServices></OurServices>
    </div>
  );
};

export default Home;
