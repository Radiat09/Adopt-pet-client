import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { useEffect, useState } from "react";
import DonationPetCard from "../../components/DonationPetCard";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_API_PK);
const DonationDetails = () => {
  const [recommended, setRecommended] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    axiosPublic.get("/donationCampaigns").then((res) => {
      const data = res.data;
      const newData = data.slice(10, 13);
      setRecommended(newData);
    });
  }, [axiosPublic]);
  // console.log(recommended);
  const { data: campaign = {}, refetch } = useQuery({
    queryKey: ["donationCampaign"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/donationCampaigns/${id}`);
      return res.data;
    },
  });
  // console.log(campaign);
  const { _id, image, name, donationTarget, totalDonation, category } =
    campaign;

  const campaignDetails = { _id, name, image, category };

  const donated = totalDonation?.reduce(
    (total, donation) => total + parseFloat(donation.amount),
    0
  );
  const target = parseFloat(donationTarget);
  const percentage = (parseFloat(donated) / target) * 100;
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="divider divider-warning w-1/2 mx-auto"></div>
      <h1 className="text-4xl text-center font-bold">
        Donate to save these innocent Animals
      </h1>
      <div className="divider divider-warning"></div>

      <div>
        <h3 className="text-3xl font-bold text-yellow-500 text-center">
          {name}
        </h3>
        <div>
          <img
            src={image}
            className="w-full h-[500px] object-cover"
            alt={`image of a pet named ${name}`}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 mx-1 md:mx-4 lg:mx-auto my-10 border-4 border-black">
          <div className="border-b-4 lg:border-r-4 border-black p-10 flex justify-center items-center">
            <h5 className="text-3xl font-bold">Target:${donationTarget}</h5>
          </div>
          <div className="border-b-4 lg:border-r-4 border-black p-10 flex justify-center items-center">
            <h5 className="text-3xl font-bold">
              Donations: {totalDonation?.length}
            </h5>
          </div>
          <div className="border-b-4 lg:border-r-4 border-black p-10 flex flex-col gap-2 justify-center items-center">
            <span className="text-3xl font-bold">Donated</span>
            <span className="text-3xl font-bold">{`[${
              donated > 0 && target ? percentage.toFixed(2) : 0
            }%]`}</span>
            <progress
              className="progress progress-success w-full"
              value={isNaN(percentage) ? 0 : percentage}
              max="100"
            ></progress>
          </div>
          <div className="border-b-4 border-black p-10 flex justify-center items-center">
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="btn btn-info w-1/2 text-white text-lg rounded-3xl"
            >
              Donate!
            </button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {/* <div className="modal-action w-full"> */}
          {/* method="dialog" */}

          <Elements stripe={stripePromise}>
            <CheckoutForm
              refetch={refetch}
              campaignDetails={campaignDetails}
            ></CheckoutForm>
          </Elements>
          {/* </div> */}
        </div>
      </dialog>

      {/* Recommend Section */}
      <section className="max-w-7xl mx-auto mt-20">
        <h2 className="text-4xl font-bold ">Recommended Campaign:</h2>
        <p className="text-red-500 font-semibold mb-5">
          Please Reload after clicking on the view details button in recommended
          section
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommended.map((campaign) => (
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

export default DonationDetails;
