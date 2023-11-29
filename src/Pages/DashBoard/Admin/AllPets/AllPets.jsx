import { FaEdit, FaTrashAlt } from "react-icons/fa";
import usePets from "../../../../Hooks/usePets/usePets";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllPets = () => {
  const axiosSecure = useAxiosSecure();
  const [pets, refetch] = usePets("", "", "");
  // console.log(pets);

  const handleDeletePet = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/pets/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleAdoptedPet = async (pet, adopted) => {
    // console.log(adopted);
    let isAdopted = {};
    if (adopted === true) {
      isAdopted = { value: false };
    } else {
      isAdopted = { value: true };
    }
    const petData = {
      email: pet.email || "",
      name: pet.name || "",
      age: pet.age || "",
      category: pet.category || "",
      location: pet.location || "",
      shortDescription: pet.shortDescription || "",
      longDescription: pet.longDescription || "",
      image: pet.image || "",
      date: pet.date || "",
      adopted: isAdopted.value,
    };
    // console.log(isAdopted);
    await axiosSecure.put(`/pets/${pet._id}`, petData).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount || res.data.upsertedCount) {
        refetch();
        toast.success(
          `${adopted === true ? "Unadopted" : "Adopted"} successfully`
        );
      }
    });
  };

  return (
    <div>
      <h1 className="uppercase text-5xl font-extrabold text-center my-10 text-transparent bg-clip-text bg-gradient-to-r from-[#ff922b] to-[#ffd43b]">
        All Pets
      </h1>
      <div className="overflow-x-auto">
        <table className="table lg:w-3/4 mx-auto">
          {/* head */}
          <thead className="">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Adopted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pets?.map((pet, idx) => (
              <tr key={pet._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={pet?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{pet?.name}</div>
                      <div className="text-sm opacity-50">{pet?.category}</div>
                    </div>
                  </div>
                </td>

                <td>
                  {pet?.adopted === true ? (
                    <button
                      onClick={() => handleAdoptedPet(pet, pet?.adopted)}
                      className="btn btn-info btn-xs text-white"
                    >
                      not adopted?
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdoptedPet(pet, pet?.adopted)}
                      className="btn btn-info btn-xs text-white"
                    >
                      adopted?
                    </button>
                  )}
                </td>
                <td className="flex justify-center items-center gap-3">
                  <Link to={`/dashboard/updatePet/${pet._id}`}>
                    <button className="btn btn-accent text-white btn-xs">
                      <FaEdit></FaEdit>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeletePet(pet._id)}
                    className="btn btn-error text-white btn-xs"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPets;
