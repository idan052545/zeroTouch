import React from "react";

import "./side-button.scss";

const SideButton = ({ children, ...otherProps }) => (
  <button className="side-button" {...otherProps}>
    <div className="icon"> {otherProps.icon}</div>
    <div className="text">{children}</div>
  </button>
);

export default SideButton;
