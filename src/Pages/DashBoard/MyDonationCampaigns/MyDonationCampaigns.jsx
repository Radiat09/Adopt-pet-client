import { FaEdit, FaPause } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth/useAuth";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Progress from "../../../components/Progress";
import { FcViewDetails } from "react-icons/fc";
import { MdNotStarted } from "react-icons/md";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyDonationCampaigns = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data = [], refetch } = useQuery({
    queryKey: ["mydonationCampaigns"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myCampaigns/${user?.email}`);
      return res.data;
    },
  });
  // console.log(data);
  const handlePause = async (id, pause) => {
    let pauseVal = {};
    if (pause === false) {
      pauseVal = { value: true };
    } else {
      pauseVal = { value: false };
    }

    // console.log(id, pause, pauseVal);
    await axiosSecure
      .patch(`/donationCampaigns/${id}`, pauseVal)
      .then((res) => {
        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${pause === true ? "Unpause" : "Pause"} Successfull!`);
        }
      });
  };
  return (
    <div>
      <h1 className="uppercase text-5xl font-extrabold text-center my-10 text-transparent bg-clip-text bg-gradient-to-r from-[#ff922b] to-[#ffd43b]">
        My Donation Campaigns
      </h1>
      <div>
        <div className="md:mx-5">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Donation Target</th>
                  <th>Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((pet, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{pet?.name}</td>
                    <td>${pet?.donationTarget}</td>
                    <td>
                      <Progress
                        totalDonation={pet?.totalDonation}
                        donationTarget={parseFloat(pet.donationTarget)}
                      ></Progress>
                    </td>
                    <td className="flex items-center gap-2">
                      <Link to={`/dashboard/updateCampaign/${pet._id}`}>
                        <button className="btn btn-info text-white btn-sm">
                          <FaEdit></FaEdit>
                        </button>
                      </Link>
                      <button
                        onClick={() => handlePause(pet._id, pet.pause)}
                        className="btn btn-warning text-red-500 btn-sm"
                      >
                        {pet.pause === true ? (
                          <MdNotStarted className="text-2xl"></MdNotStarted>
                        ) : (
                          <FaPause></FaPause>
                        )}
                      </button>
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_5").showModal()
                        }
                        className="btn btn-info text-white btn-sm"
                      >
                        <FcViewDetails className="text-xl"></FcViewDetails>
                      </button>
                    </td>
                    <td>
                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <div>
                            {pet?.totalDonation?.map((donation, idx) => (
                              <div
                                className="flex justify-between items-center text-xl font-medium"
                                key={idx}
                              >
                                <p>{donation?.name}</p>
                                <div className="divider w-20"></div>
                                <p>{donation?.amount}$</p>
                              </div>
                            ))}
                          </div>
                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDonationCampaigns;
