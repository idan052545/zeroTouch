import React from "react";
import {
  // EdgeProps,
  // getBezierPath,
  EdgeLabelRenderer,
  getSimpleBezierPath,
} from "reactflow";

export default function ZeroTouchEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) {
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        strokeWidth={5}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        {/* <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -150%) translate(${labelX}px,${labelY}px)`,
            background: "#f8f8f8",
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
          }}
          className="nodrag nopan"
        >
          {data.type}
        </div> */}
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -25%) translate(${labelX}px,${labelY}px)`,
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
          }}
          className="nodrag nopan"
        >
          {data.weight}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
