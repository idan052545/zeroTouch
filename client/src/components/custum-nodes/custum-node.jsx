import React, { memo } from "react";

import { Handle, NodeProps, Position } from "reactflow";

import "./custum-node.scss";

function ZeroTouchNode({ data }) {
  /*const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);*/

  return (
    <div>
      <Handle type="target" position={Position.Right} />
      <div>
        <img
          src={data.img}
          className="img-updater-node"
          width="50"
          height="50"
          alt=""
        />
      </div>
      <Handle type="source" position={Position.Left} />
    </div>
  );
}

export default ZeroTouchNode;
