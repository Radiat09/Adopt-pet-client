import { useLoaderData } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PetDetails = () => {
  const pet = useLoaderData();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    image,
    category,
    name: petname,
    breed,
    adopted,
    longDescription,
    shortDescription,
    age,
    color,
    location,
    weight_kg,
    vaccinated,
  } = pet.data;

  const handleAdopt = (e) => {
    const form = e.target;
    const email = form.email.value;
    const name = form.displayName.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const petId = _id;
    const petCategory = category;
    const petName = petname;
    const adoptionData = {
      email,
      name,
      phone,
      address,
      petId,
      petCategory,
      petName,
      status: "pending",
    };
    // console.log(adoptionData);
    axiosSecure.post("/adoptions", { adoptionData }).then((res) => {
      const toastId = toast.loading("Processing...");
      // console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Adoption Success...", { id: toastId });
      }
      axiosSecure.patch(`/pets/${_id}`).then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          window.location.reload(true);
        }
      });
    });
  };
  // console.log(_id);
  return (
    <div className="max-w-7xl mx-auto my-40">
      <div className="w-full lg:max-w-5xl md:mx-auto px-1 grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-8 mb-8">
        <div className=" flex flex-col justify-evenly items-end">
          <h4 className="text-2xl font-thin">
            <span className="font-bold">Name:</span> {petname}
          </h4>
          <p className="text-2xl font-thin">
            <span className="font-bold">Category: </span>
            {category}
          </p>
          <p className="text-2xl font-thin">
            <span className="font-bold">Age: </span>
            {age}
          </p>
          <p className="text-2xl font-thin">
            {" "}
            <span className="font-bold">Location: </span>
            {location === "" || !location ? "My Pet Center" : location}
          </p>
        </div>
        <div className="rounded-md">
          <img src={image} alt="" />
        </div>
        <div className="flex flex-col justify-evenly">
          <p className="text-2xl font-thin">
            {breed} <span className="font-bold">:Breed</span>
          </p>
          <p className="text-2xl font-thin">
            {color} <span className="font-bold">:Color</span>
          </p>
          <p className="text-2xl font-thin">
            {weight_kg}kg <span className="font-bold">:Weight</span>
          </p>
          <p className="text-2xl font-thin">
            {vaccinated ? "true" : "false"}{" "}
            <span className="font-bold">:Vaccinated</span>
          </p>
        </div>
      </div>
      <div className="my-4">
        <h6 className="text-center font-bold">{shortDescription}</h6>
        <p className="text-center">{longDescription}</p>
      </div>
      <div className="flex justify-center w-full">
        <button
          disabled={adopted === true}
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="btn btn-info w-1/2 mx-auto text-white text-lg rounded-3xl"
        >
          Adopt!
        </button>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action w-full">
            <form onSubmit={handleAdopt} method="dialog" className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email..."
                    className="input input-bordered"
                    disabled
                    defaultValue={user?.email}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="displayName">Name</label>
                  <input
                    id="displayName"
                    name="displayName"
                    type="text"
                    placeholder="Your name..."
                    className="input input-bordered"
                    disabled
                    defaultValue={user?.displayName}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="displayName">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="number"
                    placeholder="Enter phone number..."
                    className="input input-bordered"
                    required
                    defaultValue={user?.displayName}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="returnDate">Address</label>
                  <input
                    required
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter your address..."
                    className="input input-bordered"
                  />
                </div>
              </div>
              {/* if there is a button in form, it will close the modal */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="btn btn-info btn-outline rounded-none hover:text-white w-full"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PetDetails;
