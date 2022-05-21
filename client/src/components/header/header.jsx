import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo/logo";
//import { ReactComponent as Logo } from '../../assets/crown.svg';

import "./header.scss";

const Header = () => (
  <div className="header">
    <Logo className="logo-container" />
    <div className="options">
      <Link to="/" className="option">
        Home Page
      </Link>
      <Link to="/questions" className="option">
        Question Page
      </Link>
      <Link to="/user" className="option">
        User Page
      </Link>
    </div>
  </div>
);

/*const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});*/

export default Header;
