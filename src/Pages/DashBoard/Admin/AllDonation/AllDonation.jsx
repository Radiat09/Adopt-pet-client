import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { FcViewDetails } from "react-icons/fc";
import { MdNotStarted } from "react-icons/md";
import { FaEdit, FaPause, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Progress from "../../../../components/Progress";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AllDonation = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data: campaigns = [], refetch } = useQuery({
    queryKey: ["donationCampaigns"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donationCampaigns");
      return res.data;
    },
  });
  console.log(campaigns);
  const handlePause = async (campaign, pause) => {
    let pauseVal = {};
    if (pause === false) {
      pauseVal = { value: true };
    } else {
      pauseVal = { value: false };
    }
    const campaignData = {
      email: campaign.email || "",
      name: campaign.name || "",
      donationTarget: campaign.donationTarget || "",
      lastDate: campaign.lastDate || "",
      shortDescription: campaign.shortDescription || "",
      longDescription: campaign.longDescription || "",
      image: campaign.image || "",
      date: campaign.date || "",
      pause: pauseVal.value,
      totalDonation: [...campaign.totalDonation],
    };

    // console.log(id, pause, pauseVal);
    await axiosSecure
      .put(`/donationCampaigns/${campaign._id}`, campaignData)
      .then((res) => {
        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${pause === true ? "Unpause" : "Pause"} Successfull!`);
        }
      });
  };
  const handleCampaignDelete = (id) => {
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
        await axiosSecure.delete(`/donationCampaigns/${id}`).then((res) => {
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
                {campaigns?.map((campaign, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{campaign?.name}</td>
                    <td>${campaign?.donationTarget}</td>
                    <td>
                      <Progress
                        totalDonation={campaign?.totalDonation}
                        donationTarget={parseFloat(campaign.donationTarget)}
                      ></Progress>
                    </td>
                    <td className="flex items-center gap-2">
                      <Link to={`/dashboard/updateCampaign/${campaign._id}`}>
                        <button className="btn btn-info text-white btn-sm">
                          <FaEdit></FaEdit>
                        </button>
                      </Link>
                      <button
                        onClick={() => handlePause(campaign, campaign.pause)}
                        className="btn btn-warning text-red-500 btn-sm"
                      >
                        {campaign.pause === true ? (
                          <MdNotStarted className="text-2xl"></MdNotStarted>
                        ) : (
                          <FaPause></FaPause>
                        )}
                      </button>
                      <button
                        onClick={() => handleCampaignDelete(campaign._id)}
                        className="btn btn-info text-white btn-sm"
                      >
                        <FaTrashAlt className="text-xl"></FaTrashAlt>
                      </button>
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

export default AllDonation;
