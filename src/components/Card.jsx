import PropTypes from "prop-types";

const Card = ({ pet }) => {
  const { image, name, age } = pet;
  return (
    <div className="flex flex-col justify-between gap-5 shadow-xl w-full  pb-3 mx-auto">
      <img
        src={image}
        className="w-full h-72 object-cover"
        alt={`image of ${name}`}
      />
      <div className="px-4">
        <h3 className="text-2xl font-black">Name: {name}</h3>
        <p className="font-mono mt-2">Age: {age}</p>
        <p className="font-mono mt-2">Location: MyPet center</p>
      </div>
      <button className="btn btn-info w-1/2 mx-auto text-white text-lg rounded-3xl">
        View Details
      </button>
    </div>
  );
};
Card.propTypes = {
  pet: PropTypes.object,
};
export default Card;
