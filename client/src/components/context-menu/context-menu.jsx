import React from "react";

import "./context-menu.scss";

const ContextMenu = ({ children, className, style }) => (
  <div className={className} style={style}>
    {children}
  </div>
);

export default ContextMenu;
