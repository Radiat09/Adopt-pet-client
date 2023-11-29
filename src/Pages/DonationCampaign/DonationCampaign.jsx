import { useQuery } from "@tanstack/react-query";
import donationImg from "../../assets/images/cute-animals-group-white-background.jpg";
import DonationPetCard from "../../components/DonationPetCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const DonationCampaign = () => {
  const axiosPublic = useAxiosPublic();
  const { data: campaigns = [], refetch } = useQuery({
    queryKey: ["donationCampaigns"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donationCampaigns");
      return res.data;
    },
  });
  // console.log(campaigns);
  return (
    <div>
      <div
        className="hero min-h-[50vh]"
        style={{
          backgroundImage: `url(${donationImg})`,
        }}
      >
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl text-white font-bold">Donations</h1>
          </div>
        </div>
      </div>

      {/* Donations cards */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20 max-w-7xl mx-auto">
          {campaigns?.map((campaign) => (
            <DonationPetCard
              key={campaign._id}
              campaign={campaign}
            ></DonationPetCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DonationCampaign;
