import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOspfConfigStart } from "../../redux/router/router-actions";

import "./ospf-modal.scss";

const OSPFModal = ({ isOpen, handleClose, ip }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [setRouterID, setSetRouterID] = useState(false); // add state variable to track whether the "set router ID" checkbox is checked
  const [ospfProcess, setOspfProcess] = useState(""); // initialize state variable to store OSPF process value
  const [routerId, setRouterId] = useState(""); // initialize state variable to store router ID value
  const [networks, setNetworks] = useState([
    { network: "", wildcard: "", area: "" },
  ]); // initialize state variable to store network values

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      // parse file content and update form fields
      const ospfProcessMatch = fileContent.match(/router ospf (\d+)/);
      if (ospfProcessMatch) {
        setOspfProcess(ospfProcessMatch[1]);
      }
      const routerIdMatch = fileContent.match(/router-id (\d+\.\d+\.\d+\.\d+)/);
      if (routerIdMatch) {
        setSetRouterID(true);
        setRouterId(routerIdMatch[1]);
      }
      const networkMatches = fileContent.match(
        /network (\d+\.\d+\.\d+\.\d+) (\d+\.\d+\.\d+\.\d+) area (\d+)/g
      );
      if (networkMatches) {
        setNetworks(
          networkMatches.map((networkMatch) => {
            const [, network, wildcard, area] = networkMatch.match(
              /network (\d+\.\d+\.\d+\.\d+) (\d+\.\d+\.\d+\.\d+) area (\d+)/
            );
            return { network, wildcard, area };
          })
        );
      }
    };
    reader.readAsText(file);
  };

  const handleOspfProcessChange = (e) => {
    setOspfProcess(e.target.value); // update ospfProcess state variable on change
  };

  const handleRouterIdChange = (e) => {
    setRouterId(e.target.value); // update routerId state variable on change
  };

  const handleNetworkChange = (e, index) => {
    const newNetworks = [...networks]; // create a copy of the networks array
    newNetworks[index][e.target.name] = e.target.value; // update network value at the specified index
    setNetworks(newNetworks); // update networks state variable
  };

  const handleAddNetworkClick = () => {
    setNetworks([...networks, { network: "", wildcard: "", area: "" }]); // add a new network with empty values to the end of the networks array
  };

  const handleRemoveNetworkClick = (index) => {
    const newNetworks = [...networks]; // create a copy of the networks array
    newNetworks.splice(index, 1); // remove the network at the specified index
    setNetworks(newNetworks); // update networks state variable
  };

  const handleSetRouterIDChange = (event) => {
    setSetRouterID(event.target.checked); // update the value of the "set router ID" checkbox
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    let configOspf = { ip, config: { ospfProcess, networks } };
    if (setRouterID) {
      configOspf = { ip, config: { ospfProcess, networks, routerId } };
    }
    dispatch(sendOspfConfigStart(configOspf));
  };

  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <div className="modal-content">
        <h1 className="modal-title">Set OSPF</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="file-input">Import Configuration</label>
            <input
              type="file"
              id="file-input"
              name="file-input"
              onChange={handleFileSelect}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ospf-process">OSPF Process</label>
            <input
              type="text"
              id="ospf-process"
              name="ospf-process"
              value={ospfProcess}
              onChange={handleOspfProcessChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="set-router-id">Set router ID</label>

            <input
              type="checkbox"
              id="set-router-id"
              name="set-router-id"
              checked={setRouterID}
              onChange={handleSetRouterIDChange}
            />
          </div>
          {setRouterID && (
            <div className="form-group">
              <label htmlFor="router-id">Router ID</label>
              <input
                type="text"
                id="router-id"
                name="router-id"
                value={routerId}
                onChange={handleRouterIdChange}
              />
            </div>
          )}
          <h2 className="form-subtitle">Networks</h2>
          {networks.map((network, index) => (
            <div key={index} className="network-inputs">
              <div className="form-group">
                <label htmlFor={`network-${index}`}>Network</label>
                <input
                  type="text"
                  id={`network-${index}`}
                  name="network"
                  value={network.network}
                  onChange={(e) => handleNetworkChange(e, index)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`wildcard-${index}`}>Wildcard</label>
                <input
                  type="text"
                  id={`wildcard-${index}`}
                  name="wildcard"
                  value={network.wildcard}
                  onChange={(e) => handleNetworkChange(e, index)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`area-${index}`}>Area</label>
                <input
                  type="text"
                  id={`area-${index}`}
                  name="area"
                  value={network.area}
                  onChange={(e) => handleNetworkChange(e, index)}
                  required
                />
              </div>
              {networks.length > 1 && (
                <button
                  type="button"
                  className="remove-network-button"
                  onClick={() => handleRemoveNetworkClick(index)}
                >
                  -
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-network-button"
            onClick={handleAddNetworkClick}
          >
            +
          </button>
          <div className="form-actions">
            <button type="submit" className="send-button">
              קנפג
            </button>
            <button
              type="button"
              className="close-button"
              onClick={handleClose}
            >
              בטל
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OSPFModal;
