import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { IoPersonAddOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = async (id) => {
    // console.log("make Admin");
    await axiosSecure.patch(`/users/${id}`).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("New admin made successfully");
      }
    });
  };
  const handleBan = async (id, banned) => {
    // console.log(id, banned);
    let pauseVal = {};
    if (banned === false) {
      pauseVal = { value: true };
    } else {
      pauseVal = { value: false };
    }
    await axiosSecure.patch(`/usersBan/${id}`, pauseVal).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(
          `${banned === true ? "Unbanned" : "Banned"} successfully`
        );
      }
    });
  };
  return (
    <div>
      <h1 className="uppercase text-5xl font-extrabold text-center my-10 text-transparent bg-clip-text bg-gradient-to-r from-[#ff922b] to-[#ffd43b]">
        All users
      </h1>
      <div className="overflow-x-auto lg:w-3/4 mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <td>#</td>
              <td>Image</td>
              <td>Name</td>
              <td>Email</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td> {idx + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={
                          user?.image
                            ? user?.image
                            : "https://i.ibb.co/5L7LVhK/ba927ff34cd961ce2c184d47e8ead9f6.jpg"
                        }
                        alt={`Avatar of ${user?.name}`}
                      />
                    </div>
                  </div>
                </td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td className="flex flex-col md:flex-row gap-2">
                  {user.role === "admin" ? (
                    ""
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-info text-white btn-sm text-xl"
                    >
                      <IoPersonAddOutline></IoPersonAddOutline>
                    </button>
                  )}
                  <button
                    onClick={() => handleBan(user._id, user?.banned)}
                    className="btn btn-info text-white btn-sm"
                  >
                    {user?.banned === true ? "Unban" : "Ban"}
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

export default AllUsers;
