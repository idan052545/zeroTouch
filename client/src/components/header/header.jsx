import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo/logo";
//import { ReactComponent as Logo } from '../../assets/crown.svg';
import "./header.scss";

const Header = () => (
  <div className="header">
    <Logo className="logo-container" />
    <div className="options">
      <Link to="/user" className="option">
        פרופיל
      </Link>
      <Link to="/questions" className="option">
        התחברות
      </Link>
      <Link to="/" className="option">
        בית
      </Link>
    </div>
  </div>
);

/*const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});*/

export default Header;
