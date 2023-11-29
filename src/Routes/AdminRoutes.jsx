import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth/useAuth";
import useAdmin from "../Hooks/useAdmin/useAdmin";
import { FiLoader } from "react-icons/fi";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isPending] = useAdmin();
  const location = useLocation();
  if (loading || isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <FiLoader className="text-5xl text-center" />
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};
AdminRoutes.propTypes = {
  children: PropTypes.node,
};
export default AdminRoutes;
