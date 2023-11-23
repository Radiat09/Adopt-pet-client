import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // const { user, logout } = useAuth();
  return (
    <div className="flex flex-col gap-5 mt-10">
      {/* {user ? ( */}
      <div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="avatar m-1">
            {/* <div className="w-9 rounded-full ring ring-secondary ring-offset-pink-500 ring-offset-2">
                {user?.photoURL ? (
                  <img src={user?.photoURL} />
                ) : (
                  <img src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" />
                )}
              </div> */}
          </div>
          {/* <p className="whitespace-nowrap font-bold text-red-700 text-lg">
              {user.displayName}
            </p> */}
          <button
            className="btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm w-full"
            // onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
      {/* ) : ( */}
      <div className="w-full flex flex-col items-center gap-4 ">
        <NavLink
          to="/login"
          className="btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm w-full"
        >
          Login
        </NavLink>
        <NavLink
          to="register"
          className="btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm w-full"
        >
          Register
        </NavLink>
      </div>
      {/* )} */}
      {/* Navbar menu content here */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "btn text-yellow-500 border-yellow-500 btn-sm"
            : "btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/addbooks"
        className={({ isActive }) =>
          isActive
            ? "btn text-yellow-500 border-yellow-500 btn-sm"
            : "btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm"
        }
      >
        Add Books
      </NavLink>
      <NavLink
        to="/allbooks"
        className={({ isActive }) =>
          isActive
            ? "btn text-yellow-500 border-yellow-500 btn-sm"
            : "btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm"
        }
      >
        All Books
      </NavLink>
      <NavLink
        to="/borrowedbooks"
        className={({ isActive }) =>
          isActive
            ? "btn text-yellow-500 border-yellow-500 btn-sm"
            : "btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm"
        }
      >
        Borrowrd Books
      </NavLink>
    </div>
  );
};

export default Sidebar;
