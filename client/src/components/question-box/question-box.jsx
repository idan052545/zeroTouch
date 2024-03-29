import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import FormInput from "../form-input/form-input";
import DropdownList from "../dropdown-list/dropdown-list";
import QuestionBoxWrapper from "../../assets/wrappers/questionBox-wrapper";
const QuestionBox = ({ label, name, isDropdown, handleChange }) => (
  <QuestionBoxWrapper>
    <h3 className=" btn btn-reverse btn-block">
      <FaQuestionCircle />
      {label}
    </h3>
    {!isDropdown ? (
      <FormInput
        type="text"
        className="form form-group ticket-headings form-input"
        id={label}
        name={name}
        placeholder={label}
        handleChange={handleChange}
        required
      />
    ) : (
      <DropdownList
        labelText={label}
        handleChange={handleChange}
        name={name}
        list={["בחר", "b", "c", "d"]}
      />
    )}
  </QuestionBoxWrapper>
);
export default QuestionBox;
