import { Link, Outlet } from "react-router-dom";
import DashSide from "../Shared/dashboard/DashSide";
import { FaAlignJustify } from "react-icons/fa6";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <div className="w-full h-full">
          <div className="w-full py-4 px-2 flex justify-between lg:hidden">
            <Link className="text-4xl font-extrabold" to="/">
              My
              <span className="text-yellow-500 text-4xl font-extrabold">
                Pet
              </span>
            </Link>
            <label htmlFor="my-drawer-2" className="btn drawer-button ">
              <FaAlignJustify />
            </label>
          </div>
          <div>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <DashSide></DashSide>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
