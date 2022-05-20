import React from "react";

import { FaQuestionCircle } from "react-icons/fa";
import FormInput from "../form-input/form-input";
import QuestionBoxWrapper from "../../assets/wrappers/questionBox-wrapper";
const QuestionBox = ({ label }) => (
  <QuestionBoxWrapper>
    <h3 className=" btn btn-reverse btn-block">
      <FaQuestionCircle />
      {label}
    </h3>
    <FormInput
      type="text"
      className="form form-group ticket-headings"
      id={label}
      name={label}
      placeholder={label}
      required
    />
  </QuestionBoxWrapper>
);
export default QuestionBox;
