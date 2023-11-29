import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { GiConfirmed } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AdoptionRequest = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data: adoptions = [], refetch } = useQuery({
    queryKey: ["adoptionRequests"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/adoptions/${user?.email}`);
      return res.data;
    },
  });
  console.log(adoptions);

  const handleConfirm = async (id) => {
    console.log("handled", id);
    const status = "confirmed";
    await axiosSecure.patch(`/adoptions/${id}`, { status }).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        toast.success("Confirmation Success!");
        refetch();
      }
    });
  };

  const handleReject = async (id) => {
    await axiosSecure.delete(`/adoptions/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.deletedCount > 0) {
        toast.success("Deleted Success!");
        refetch();
      }
    });
  };
  return (
    <div>
      <div>
        <h1 className="uppercase text-5xl font-extrabold text-center my-10 text-transparent bg-clip-text bg-gradient-to-r from-[#ff922b] to-[#ffd43b]">
          Adoption Requests
        </h1>
        <div>
          <div className="md:mx-5">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Pet Name</th>
                    <th>Pet Category</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adoptions?.map((adopt, idx) => (
                    <tr key={adopt._id}>
                      <td>{idx + 1}</td>
                      <td>{adopt?.petName}</td>
                      <td>{adopt?.petCategory}</td>
                      <td>
                        {adopt?.status === "confirmed" ? (
                          <p className="btn btn-xs bg-green-500 text-white">
                            confirmed
                          </p>
                        ) : (
                          <p className="btn btn-xs bg-red-500 text-white">
                            Pending
                          </p>
                        )}
                      </td>
                      <>
                        {adopt?.status === "confirmed" ? (
                          <td>
                            <p className="btn btn-xs bg-green-500 text-white">
                              confirmed
                            </p>
                          </td>
                        ) : (
                          <td className="flex gap-3 justify-start">
                            <button
                              onClick={() => handleConfirm(adopt._id)}
                              className="btn btn-success btn-sm rounded-full text-white text-2xl"
                            >
                              <GiConfirmed></GiConfirmed>
                            </button>
                            <button
                              onClick={() => handleReject(adopt._id)}
                              className="btn btn-warning btn-sm rounded-full text-red-500 text-2xl"
                            >
                              <MdCancel />
                            </button>
                          </td>
                        )}
                      </>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionRequest;
