import PropTypes from "prop-types";
const PetCard = ({ pet }) => {
  const { image, name, characteristics } = pet;
  return (
    <div className="flex flex-col justify-between gap-5 shadow w-fit pb-3">
      <img
        src={image}
        className="w-full h-72 object-cover"
        alt={`image of ${name}`}
      />
      <div className="px-4">
        <h3 className="text-2xl font-black">{name}</h3>
        <p className="font-mono mt-2">{characteristics}</p>
      </div>
      <button className="btn btn-info w-1/2 mx-auto text-white text-lg rounded-3xl">
        Learn More
      </button>
    </div>
  );
};

PetCard.propTypes = {
  pet: PropTypes.object,
};
export default PetCard;
