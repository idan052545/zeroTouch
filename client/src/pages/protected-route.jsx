import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/user-selectors";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;
