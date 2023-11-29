import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DonationPetCard = ({ campaign }) => {
  const { _id, image, name, donationTarget, totalDonation } = campaign;
  // console.log(campaign);
  const donated = totalDonation?.reduce(
    (total, donation) => total + parseFloat(donation.amount),
    0
  );
  const target = parseFloat(donationTarget);
  const percentage = (donated / target) * 100;
  // console.log(percentage);
  return (
    <div className="flex flex-col justify-between gap-5 shadow-xl w-full  pb-3 mx-auto">
      <img
        src={image}
        className="w-full h-72 object-cover"
        alt={`image of ${name}`}
      />
      <div className="px-4">
        <h3 className="text-2xl font-black">Name: {name}</h3>
        <div className="flex justify-between">
          <p className="font-mono mt-2">
            Target:${target ? target : "not added"}
          </p>
          <p className="font-mono mt-2">
            Donated:${donated} |
            {donated > 0 && target ? percentage.toFixed(2) : 0}%|
          </p>
        </div>
        <progress
          className="progress progress-success w-full"
          value={isNaN(percentage) ? 0 : percentage}
          max="100"
        ></progress>
      </div>
      <Link className="w-full flex justify-center" to={`/donations/${_id}`}>
        <button className="btn btn-info w-1/2 text-white text-lg rounded-3xl">
          View Details
        </button>
      </Link>
    </div>
  );
};
DonationPetCard.propTypes = {
  campaign: PropTypes.object,
};
export default DonationPetCard;
