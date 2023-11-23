import { Link, NavLink } from "react-router-dom";
// import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  // const { user, logout } = useAuth();
  const darkMode = () => {
    document.documentElement.setAttribute("data-theme", "light");
  };
  const lightMode = () => {
    document.documentElement.setAttribute("data-theme", "dark");
  };
  const toggleTheme = (e) => {
    if (e.target.checked) lightMode();
    else darkMode();
  };
  // console.log(user);
  return (
    <div className="w-full px-[25px]">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1 text-4xl font-extrabold">
        <Link to="/">
          My<span className="text-yellow-500">Pet</span>
        </Link>
      </div>
      {/* Navbar menu content here */}
      <div className="hidden flex-1  lg:flex justify-start items-center gap-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-bold"
              : "text-gray-700 font-bold hover:text-yellow-500"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/addbooks"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-bold  whitespace-nowrap"
              : "text-gray-700 font-bold hover:text-yellow-500 whitespace-nowrap"
          }
        >
          Pet Listing
        </NavLink>
        <NavLink
          to="/allbooks"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-bold  whitespace-nowrap"
              : "text-gray-700 font-bold hover:text-yellow-500 whitespace-nowrap"
          }
        >
          Donation Campaigns
        </NavLink>
      </div>
      <div className="hidden lg:block">
        <div className="flex justify-between items-center gap-4">
          {/* {user ? ( */}
          <div>
            <div className="dropdown dropdown-bottom dropdown-end cursor-pointer">
              <div tabIndex={0} className="avatar m-1">
                <div className="w-9 rounded-full ring ring-secondary ring-offset-yellow-600 ring-offset-2">
                  {/* {user.photoURL ? ( */}
                  {/* <img src={user.photoURL} /> */}
                  {/* ) : ( */}
                  <img src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" />
                  {/* )} */}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box  "
              >
                {/* <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li> */}
                <li className="whitespace-nowrap font-bold text-yellow-700 text-lg">
                  {/* {user.displayName} */}
                </li>
                <li>
                  <button className="btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm rounded-none">
                    DashBoard
                  </button>
                </li>
                <li>
                  <button
                    className="btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm rounded-none"
                    // onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* ) : ( */}
          <div className="navbar-end flex items-center gap-4 ">
            <NavLink
              to="/login"
              className="btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm rounded-none"
            >
              Login
            </NavLink>
            <NavLink
              to="register"
              className="btn bg-yellow-500 hover:text-yellow-500 hover:border-yellow-500 text-white btn-sm rounded-none"
            >
              Register
            </NavLink>
          </div>
          {/* )} */}
          <label className="swap swap-rotate mr-2">
            {/* this hidden checkbox controls the state */}
            <input onChange={toggleTheme} type="checkbox" />

            {/* sun icon */}
            <svg
              className="swap-on fill-current w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off fill-current w-8 h-8 text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
