import React, { memo, useState } from "react";

import { Handle, Position } from "reactflow";

import "./custum-node.scss";

export default memo(({ data }) => {
  const [showLabels, setShowLabels] = useState(false); // state to track visibility of labels

  // Click handler function to toggle the node's click state
  const handleClick = () => {
    setShowLabels(!showLabels);
  };
  const handles = [];

  // Set the radius of the circle and the angle between handles
  const radius = 25; // radius of the circle in pixels
  const handleAngle = 360 / data.intf.length; // angle between handles in degrees

  for (let i = 0; i < data.intf.length; i++) {
    const angle = handleAngle * i; // current handle angle in degrees
    const radians = (angle * Math.PI) / 180; // current handle angle in radians

    // Calculate the left and top positions of the handle using the angle and radius
    const left = 50 / 2 + radius * Math.cos(radians);
    const top = 50 / 2 + radius * Math.sin(radians);

    // Set the left and top positions as inline styles on the handle element
    const style = {
      left,
      top,
      background: "#555",
      position: "absolute",
      marginTop: 20,
      // marginLeft: 10,
      // visibility: "hidden",
    };

    handles.push(
      <Handle
        id={`src-${data.intf[i]}-${data.intfIP[i]}`}
        key={`src-${data.intf[i]}-${data.intfIP[i]}`}
        type="source"
        // position="right"
        position={
          angle >= 0 && angle <= 90
            ? Position.Bottom
            : angle >= 90 && angle <= 180
            ? Position.Top
            : angle >= 180
            ? Position.Right
            : Position.Left
        }
        style={style}
      />
    );
    handles.push(
      <Handle
        id={`tgt-${data.intf[i]}-${data.intfIP[i]}`}
        key={`tgt-${data.intf[i]}-${data.intfIP[i]}`}
        type="target"
        position={
          angle >= 0 && angle <= 90
            ? Position.Bottom
            : angle >= 90 && angle <= 180
            ? Position.Top
            : angle >= 180
            ? Position.Right
            : Position.Left
        }
        style={style}
      />
    );
  }

  return (
    <div onClick={handleClick}>
      {/* {handles} */}
      {handles.map((handle, index) => {
        if (handle.props.type === "source") {
          return (
            <>
              {handle}
              {showLabels && (
                <div
                  style={{
                    position: "absolute",
                    left: handle.props.style.left - 25 + 5, // position the label centered under the handle
                    top: handle.props.style.top + 25 - 10, // position the label below the handle
                    width: 40, // width of the label
                    height: 20, // height of the label
                    borderRadius: "5px", // make the label rectangular with rounded corners
                    background: "#f8f8f8", // background color of the label
                    display: "flex", // make the label a flex container
                    alignItems: "center", // center the text horizontally
                    justifyContent: "center", // center the text vertically
                    fontSize: 5, // smaller font size
                    fontWeight: 700,
                    textAlign: "center",
                    color: "#333", // dark gray text color
                    fontFamily: "sans-serif", // sans-serif font
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)", // subtle box shadow
                  }}
                  className="nodrag nopan label"
                >
                  {data.intfIP[index / 2]}
                  <br />
                  {data.intf[index / 2]}
                </div>
              )}
            </>
          );
        }
        return handle;
      })}
      {/* <Handle type="target" position={Position.Right} /> */}
      <div>
        <div className="label">{data.hostname}</div>

        <img
          src={data.img}
          className="img-updater-node"
          width="50"
          height="50"
          alt=""
        />
      </div>
      {/* <Handle type="source" position={Position.Left} /> */}
    </div>
  );
});
