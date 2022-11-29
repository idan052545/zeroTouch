import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/logo";
//import { ReactComponent as Logo } from '../../assets/crown.svg';
import "./header.scss";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { useDispatch, useSelector } from "react-redux";
import { signOutStart } from "../../redux/user/user-actions";

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="header">
      <Logo className="logo-container" />
      <div className="options">
        {currentUser ? (
          <Link to="/user" className="option">
            פרופיל
          </Link>
        ) : null}

        <Link to="/" className="option">
          בית
        </Link>
        {currentUser ? (
          <div
            className="option"
            onClick={() => {
              dispatch(signOutStart());
              navigate("/questions");
            }}
          >
            התנתקות
          </div>
        ) : (
          <Link className="option" to="/questions">
            התחברות
          </Link>
        )}
      </div>
    </div>
  );
};

/*const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});*/

export default Header;
