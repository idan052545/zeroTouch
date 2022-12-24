import { useState, useRef, useEffect } from "react";
import TerminalWrapper from "../../assets/wrappers/terminal-wrapper";
import FormInput from "../form-input/form-input";
import { BiSearch } from "react-icons/bi";
import OSPFModal from "../ospf-modal/ospf-modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { sendCommandStart } from "../../redux/router/router-actions";
import {
  selectIsFetching,
  selectShowResult,
} from "../../redux/router/router-selectors";

const Terminal = ({ text, user }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [isSearchSet, setIsSearchSet] = useState(false);
  const [commandValue, setCommandValue] = useState("");
  const [isOSPFModalOpen, setIsOSPFModalOpen] = useState(false);
  const result = useSelector(selectShowResult);
  let isLoading = !useSelector(selectIsFetching);

  useEffect(() => {
    outputRef.current.value = outputRef.current.value + "\n" + result;
  }, [isLoading]);

  const outputRef = useRef();
  const handleOSPFModalClose = () => {
    setIsOSPFModalOpen(false); // close the modal
  };

  const handleTerminalChange = (e) => {
    setCommandValue(e.target.value); // update searchValue state variable on change
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value); // update searchValue state variable on change
  };

  const handleSetClick = () => {
    setIsSearchSet(true); // set search as set
  };

  const handleCancelClick = () => {
    setIsSearchSet(false); // set search as not set
    setSearchValue(""); // clear search value
  };

  const handleOnEnter = () => {
    if (commandValue === "clear") {
      outputRef.current.value = "";
    } else {
      outputRef.current.value = outputRef.current.value + "\n" + commandValue;
      dispatch(sendCommandStart(searchValue, commandValue));
    }
    setCommandValue("");
  };

  return (
    <TerminalWrapper>
      <div className="title">show commands</div>
      <div className="search-container">
        <BiSearch className="search-icon" />
        <FormInput
          className="search-input"
          type="text"
          id="search"
          name="search"
          placeholder="Search for IP address"
          handleChange={handleSearchChange}
          disabled={isSearchSet} // disable input if search is set
          required
        />
        {isSearchSet ? (
          // show cancel button if search is set
          <button className="cancel-button" onClick={handleCancelClick}>
            Cancel
          </button>
        ) : (
          // show set button if search is not set
          <button className="set-button" onClick={handleSetClick}>
            Set
          </button>
        )}
      </div>
      <textarea ref={outputRef} disabled className="Prompt__Output" />

      <div className="container">
        <div className="Terminal">
          <div className="Terminal__Toolbar">
            <div className="Toolbar__buttons"></div>
            <p className="Toolbar__user"></p>
          </div>
          <div className="Terminal__body">
            <div className="Terminal__text"></div>
            <div className="Terminal__Prompt">
              <span className="Prompt__user"></span>
              <span className="Prompt__location">~</span>
              <span className="Prompt__dollar">$</span>
              <span className="Prompt__cursor"></span>
              <FormInput
                className="Prompt__Input"
                type="text"
                id={text}
                name={text}
                placeholder={text}
                handleChange={handleTerminalChange}
                value={commandValue}
                required
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleOnEnter();
                  }
                }}
              />
              <button
                type="button"
                className="open-ospf-modal-button"
                onClick={() => setIsOSPFModalOpen(true)} // open the modal when button is clicked
              >
                OSPF
              </button>
            </div>
            <OSPFModal
              isOpen={isOSPFModalOpen}
              handleClose={handleOSPFModalClose}
              ip={searchValue}
            />
          </div>
        </div>
      </div>
    </TerminalWrapper>
  );
};
export default Terminal;
