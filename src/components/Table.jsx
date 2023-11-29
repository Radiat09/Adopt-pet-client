import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

// w Serial Number, Pet name, Pet category, Pet image, Adoption
// Status, and three buttons

const Table = ({ data, refetch }) => {
  // const [data, setData] = useState([]);
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosPublic.get(`/getCounts/${user?.email}`).then((res) => {
      // console.log(res.data.petCount);
      setCount(res.data.petCount);
    });
  }, [axiosPublic, user?.email]);

  // useEffect(() => {
  //   axiosPublic
  //     .get(
  //       `/pets?query1=${""}&query2=${""}&query3=${
  //         user?.email
  //       }&page=${currentPage}&limit=10`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       setData(res.data);
  //     });
  // }, [axiosPublic, currentPage, user?.email]);

  const totalPage = Math.ceil(count / 10);
  const pages = [...Array(totalPage).keys()];

  // console.log(count, totalPage, pages);

  const handleDeletePet = (id) => {
    // console.log(id);
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
            // console.log(res.data);
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

  const handleAdopted = async (id) => {
    console.log("handleing", id);
    await axiosSecure.patch(`/pets/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Data Updated Succesfully!");
      }
    });
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="md:mx-5">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Adopted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((pet, idx) => (
                <tr key={pet._id}>
                  <td>{idx + 1}</td>
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
                    </div>
                  </td>
                  <td>{pet?.name}</td>
                  <td>{pet?.category}</td>
                  <td>
                    {pet?.adopted ? (
                      <p className="text-green-500">Adopted</p>
                    ) : (
                      <p className="text-red-500">not Adopted</p>
                    )}
                  </td>
                  <th className="flex items-center gap-2">
                    <Link to={`/dashboard/updatePet/${pet._id}`}>
                      <button className="btn btn-info text-white btn-sm">
                        <FaEdit></FaEdit>
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeletePet(pet._id)}
                      className="btn btn-warning text-red-500 btn-sm"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                    <button
                      disabled={pet.adopted}
                      onClick={() => handleAdopted(pet._id)}
                      className={`btn ${
                        pet?.adopted ? "btn-success" : "btn-error"
                      } text-white btn-sm`}
                    >
                      {pet?.adopted ? "Adopted" : "not Adopted?"}
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className={`flex justify-center items-center gap-3 my-16 
             ${count < 10 && "hidden"}
            `}
          >
            <button
              className="btn btn-outline rounded-full btn-info"
              onClick={handlePrevPage}
            >
              <FaArrowLeft></FaArrowLeft>
            </button>
            {pages.map((page) => (
              <button
                className={`btn btn-outline rounded-full ${
                  currentPage === page + 1 ? "btn-accent" : "btn-info"
                }`}
                onClick={() => setCurrentPage(page + 1)}
                key={page}
              >
                {page + 1}
              </button>
            ))}
            <button
              className="btn btn-outline rounded-full btn-info"
              onClick={handleNextPage}
            >
              <FaArrowRight></FaArrowRight>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Table.propTypes = {
  data: PropTypes.array,
};
export default Table;
