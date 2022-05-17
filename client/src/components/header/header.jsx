import React from "react";
import { Link } from "react-router-dom";

//import { ReactComponent as Logo } from '../../assets/crown.svg';

import "./header.scss";

const Header = () => (
  <div className="header">
    <div className="logo-container"></div>
    <div className="options">
      <div className="option">Question Page</div>
      <div className="option">User Page</div>
    </div>
  </div>
);

/*const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});*/

export default Header;
