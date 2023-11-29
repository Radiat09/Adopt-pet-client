import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth/useAuth";
import { useState } from "react";
import useAdmin from "../../Hooks/useAdmin/useAdmin";

const DashSide = () => {
  const [toggle, setToggle] = useState(true);
  const [isAdmin] = useAdmin();
  const { user } = useAuth();
  const handleToggle = () => {
    setToggle(!toggle);
  };
  // console.log(toggle, isAdmin);
  return (
    <div className="flex flex-col gap-5 mt-10">
      <div>
        <div className="text-center text-4xl font-extrabold mb-10">
          <Link className="cursor-pointer" to="/">
            My<span className="text-yellow-500">Pet</span>
          </Link>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="avatar m-1">
            <div className="w-9 rounded-full ring ring-secondary ring-offset-pink-500 ring-offset-2">
              {user?.photoURL ? (
                <img src={user?.photoURL} />
              ) : (
                <img src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" />
              )}
            </div>
          </div>
          <p className="whitespace-nowrap font-bold text-red-700 text-lg">
            {user?.displayName}
          </p>
        </div>
      </div>
      <div
        className={`flex flex-col items-center gap-3 justify-center my-8 ${
          isAdmin === true ? "" : "hidden"
        }`}
      >
        <p className="text-center font-bold text-green-500">
          {toggle === true ? "Switch to User" : "Switch to Admin"}
        </p>
        <input
          onChange={handleToggle}
          type="checkbox"
          className="toggle toggle-lg"
        />
      </div>
      {/* Navbar menu content here */}
      {toggle === true && isAdmin === true ? (
        <div className="flex flex-col gap-5">
          <NavLink
            to="/dashboard/allUsers"
            className={({ isActive }) =>
              isActive
                ? "btn text-yellow-500 border-yellow-500 btn-sm"
                : "btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm"
            }
          >
            All Users
          </NavLink>
          <NavLink
            to="/dashboard/allPets"
            className={({ isActive }) =>
              isActive
                ? "btn text-yellow-500 border-yellow-500 btn-sm"
                : "btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm"
            }
          >
            All Pet
          </NavLink>
          <NavLink
            to="/dashboard/allDonation"
            className={({ isActive }) =>
              isActive
                ? "btn text-yellow-500 border-yellow-500 btn-sm"
                : "btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm"
            }
          >
            All Donation
          </NavLink>
        </div>
      ) : (
        <div className="flex flex-col gap-5 ">
          <NavLink
            to="/dashboard/addAPet"
            className={({ isActive }) =>
              isActive
                ? "btn text-yellow-500 border-yellow-500 btn-sm"
                : "btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm"
            }
          >
            Add A Pet
          </NavLink>
          <NavLink
            to="/dashboard/myAddedPets"
            className={({ isActive }) =>
              isActive
                ? "btn text-yellow-500 border-yellow-500 btn-sm"
                : "btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm"
            }
          >
            My Added Pets
          </NavLink>
          <NavLink
            to="/dashboard/createDonationCampaign"
            className={({ isActive }) =>
              isActive
                ? "btn text-yellow-500 border-yellow-500 btn-sm"
                : "btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm"
            }
          >
            Create Donation Campaign
          </NavLink>
          <NavLink
            to="/dashboard/myDonationsCampaigns"
            className={({ isActive }) =>
              isActive
                ? "btn text-yellow-500 border-yellow-500 btn-sm"
                : "btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm"
            }
          >
            My Donation Campaigns
          </NavLink>
          <NavLink
            to="/dashboard/myDonations"
            className={({ isActive }) =>
              isActive
                ? "btn text-yellow-500 border-yellow-500 btn-sm"
                : "btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm"
            }
          >
            My Donations
          </NavLink>
          <NavLink
            to="/dashboard/adoptionRequest"
            className={({ isActive }) =>
              isActive
                ? "btn text-yellow-500 border-yellow-500 btn-sm"
                : "btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm"
            }
          >
            Adoption Request
          </NavLink>
        </div>
      )}
    </div>
  );
};
export default DashSide;
