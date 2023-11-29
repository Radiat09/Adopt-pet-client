import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: donations = [], refetch } = useQuery({
    queryKey: ["myDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${user?.email}`);
      return res.data;
    },
  });
  // console.log(donations);

  const handleRefund = (id) => {
    // console.log("handled", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Refund me!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/donations/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Refund is in process!",
              text: "Are you happy now? You heartless! ",
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
        My Donations
      </h1>
      <div>
        <div className="md:mx-5">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Pet Image</th>
                  <th>Pet Name</th>
                  <th>Donated Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {donations?.map((donation, idx) => (
                  <tr key={donation._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={donation?.campaignDetails?.image}
                            alt={`Avatar image of ${donation?.campaignDetails?.name} pet`}
                          />
                        </div>
                      </div>
                    </td>
                    <td>{donation?.campaignDetails?.name}</td>
                    <td>${donation?.amount}</td>
                    <td className="flex items-center gap-2">
                      <button
                        onClick={() => handleRefund(donation._id)}
                        className="btn btn-info text-white btn-sm"
                      >
                        Refund
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

export default MyDonations;
