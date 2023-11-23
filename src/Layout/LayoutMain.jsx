import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";
import Footer from "../Shared/Footer";
import PropTypes from "prop-types";

const LayoutMain = ({ children }) => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar py-6 border-b">
          <Navbar></Navbar>
        </div>
        {/* Page content here */}
        <div className="min-h-[70vh]">{children}</div>
        <Footer></Footer>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-64 md:w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

LayoutMain.propTypes = {
  children: PropTypes.node,
};
export default LayoutMain;
