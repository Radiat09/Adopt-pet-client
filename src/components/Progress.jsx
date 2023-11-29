import PropTypes from "prop-types";

const Progress = ({ totalDonation, donationTarget }) => {
  const donated = totalDonation?.reduce(
    (total, donation) => total + parseFloat(donation.amount),
    0
  );
  const target = donationTarget;
  const percentage = (donated / target) * 100;
  return (
    <div>
      <p className="text-center">{percentage.toFixed(2)}%</p>
      <progress
        className="progress progress-success w-full"
        value={percentage}
        max="100"
      ></progress>
    </div>
  );
};

Progress.propTypes = {
  totalDonation: PropTypes.array,
  donationTarget: PropTypes.number,
};
export default Progress;
